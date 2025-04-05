// Request wake lock when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Elements
    let hasTranslationAudio = false;
    const dialogList = document.getElementById('dialogList');
    const dialogView = document.getElementById('dialogView');
    const dialogText = document.getElementById('dialogText');
    const dialogImg = document.getElementById('dialogImg');
    const dialogTranslation = document.getElementById('dialogTranslation');
    const dialogExamples = document.getElementById('dialogExamples');
    const audioPlayer = document.getElementById('audioPlayer');
    const translationPlayer = document.getElementById('translationPlayer');
    const backButton = document.getElementById('backButton');
    const showTranslationsCheckbox = document.getElementById('showTranslations');
    const autoplayCheckbox = document.getElementById('autoplay');
    const durationInputContainer = document.getElementById('durationInputContainer');
    const durationInput = document.getElementById('duration');
    const muteCheckbox = document.getElementById('mute');
    const muteTCheckbox = document.getElementById('muteT');
    const randomizeCheckbox = document.getElementById('randomize');
    let wakeLock = null;

    async function requestWakeLock() {
        try {
            wakeLock = await navigator.wakeLock.request("screen");
            console.log("Wake Lock is active");

            // Renew the wake lock if it gets released
            wakeLock.addEventListener("release", () => {
                console.log("Wake Lock was released");
            });
        } catch (err) {
            console.error(`Wake Lock error: ${err.message}`);
        }
    }
    requestWakeLock()


// Reapply wake lock when visibility changes (e.g., when switching tabs)
    document.addEventListener("visibilitychange", () => {
        if (wakeLock !== null && document.visibilityState === "visible") {
            requestWakeLock();
        }
    });


// Mute/unmute audio when the checkbox is toggled
    muteCheckbox.addEventListener('change', function () {
        audioPlayer.muted = this.checked;
        translationPlayer.muted = this.checked;
    });

    muteTCheckbox.addEventListener('change', function () {
        translationPlayer.muted = this.checked;
    });


// Mute/unmute audio when the checkbox is toggled
    dialogText.addEventListener('click', function () {
        audioPlayer.play();
    });

    let currentDialog = null;
    let currentIndex = 0;

// Display the list of dialogs
    async function showDialogs() {
        window.configData = [
            {
                title: 'Current Words',
                json: 'current.json'
            },
            {
                title: 'Phrases',
                json: 'phrases.json'
            },
            {
                title: 'All words',
                json: 'all.json'
            }
        ];

        for (const item of window.configData) {
            const res = await fetch(`./jsons/${item.json}`);
            item.parts = await res.json();
        }

        dialogList.innerHTML = Object.keys(window.configData).map(key =>
            `<button class="btitle w-full bg-blue-500 text-white p-2 rounded mb-2" onclick="startDialog('${key}')">
          ${window.configData[key].title} (${window.configData[key].parts.length})
         </button>`
        ).join('');
        dialogList.classList.remove('hidden');
        dialogView.classList.add('hidden');
    }

// Start the selected dialog
    function startDialog(dialogKey) {
        currentDialog = window.configData[dialogKey];
        currentIndex = 0;

        if (randomizeCheckbox.checked) {
            currentDialog.parts = currentDialog.parts
                .filter((p) => p.translation !== 'աբգդեզ')
                .sort(() => Math.random() - 0.5);
        }

        loadPart();
        dialogList.classList.add('hidden');
        dialogView.classList.remove('hidden');
    }

    function loadNextPart() {
        if (currentIndex >= currentDialog.parts.length) {
            return;
        }
        const delay = parseInt(durationInput.value) || 0;
        setTimeout(() => {
            currentIndex++;
            loadPart();
        }, delay * 1000);
    }

    class RandomColor {
        colors = ['green', 'teal', 'darkblue', 'brown'];

        getRandomColor() {
            return this.colors.sort(() => Math.random() - 0.5).pop();
        };
    }

// Load and display the current part of the dialog
    function loadPart() {
        try {
            hasTranslationAudio = false;
            const part = currentDialog.parts[currentIndex];

            dialogText.innerText = part.text;
            if (part.image) {
                dialogImg.src = part.image;
            } else {
                dialogImg.src = "";
            }
            dialogTranslation.innerText = '';
            setTimeout(() => {
                dialogTranslation.innerText = part.translation ?? '';
            }, 2000)
            const r = new RandomColor();
            dialogExamples.innerHTML = part.examples?.map((exampleText) => {
                const highlightedText = exampleText.replaceAll(new RegExp(part.text, 'gi'), `<span class="current">${part.text}</span>`);
                return `<p style="color: ${r.getRandomColor()}">${highlightedText}</p>`;
            }).join('')
            // Show or hide translation based on the checkbox
            if (showTranslationsCheckbox.checked) {
                dialogTranslation.classList.remove('hidden');
                if (part.audioTranslation) {
                    translationPlayer.src = part.audioTranslation;
                    hasTranslationAudio = true;
                }
            } else {
                dialogTranslation.classList.add('hidden');
            }

            if ((!part.audio || part.audio.includes('xxx')) && autoplayCheckbox.checked) {
                loadNextPart();
                return;
            }

            audioPlayer.src = part.audio;

            audioPlayer.play();
        } catch (err) {
            console.log(`Failed to load audio: ${currentDialog.parts[currentIndex].audio}`, err);
        }

    }

// Back button returns to the list of dialogs
    backButton.addEventListener('click', showDialogs);

// Swipe navigation (mobile)
    let touchStartX = 0;
    document.addEventListener("touchstart", e => touchStartX = e.touches[0].clientX);
    document.addEventListener("touchend", e => {
        let touchEndX = e.changedTouches[0].clientX;
        if (touchEndX < touchStartX - 50 && currentIndex < currentDialog.parts.length - 1) {
            currentIndex++;
            loadPart();
        } else if (touchEndX > touchStartX + 50 && currentIndex > 0) {
            currentIndex--;
            loadPart();
        }
    });

// Autoplay: when the audio ends, if enabled, wait for the specified duration then go to the next part
    audioPlayer.addEventListener('ended', () => {
        if (hasTranslationAudio) {
            translationPlayer.play();
            return;
        }

        if (autoplayCheckbox.checked) {
            loadNextPart()
        }
    });

    translationPlayer.addEventListener('ended', () => {
        if (autoplayCheckbox.checked) {
            loadNextPart()
        }
    });

// Toggle duration input visibility when Autoplay is checked/unchecked
    autoplayCheckbox.addEventListener('change', function () {
        if (this.checked) {
            durationInputContainer.classList.remove('hidden');
        } else {
            durationInputContainer.classList.add('hidden');
        }
    });

// Optionally reload the current part when toggling the "Show Translations" checkbox
    showTranslationsCheckbox.addEventListener('change', () => {
        if (showTranslationsCheckbox.checked) {
            dialogTranslation.classList.remove('hidden');
        } else {
            dialogTranslation.classList.add('hidden');
        }
    });

// Initialize dialog list
    showDialogs();

// Expose startDialog to the global scope for inline onclick usage
    window.startDialog = startDialog;

});
