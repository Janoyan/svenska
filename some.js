const fs = require('fs');
const axios = require('axios');

async function generateAudio(text, lang, voice, outputFileName) {
    const response = await axios.post('https://speechgen.io/index.php?r=api/text', {
        token: 'ddf440363bd6fba8feaf5a8630ed054f',
        email: 'meruzh2008@gmail.com',
        text: text,
        format: 'mp3',
        lang: lang,
        voice: voice
    });
    const fileUrl = response.data.file;

    // download and save the file
    const writer = fs.createWriteStream(outputFileName);
    const r = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream'
    });
    r.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

const text = `
`;

(async function () {
    const result = [];


    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i += 2) {
        const text = lines[i];
        const translation = lines[i + 1];
        const audioFileName = `${text
            .replaceAll(' ', '_')
            .replaceAll('.', '')
            .replaceAll('?', '')
            .replaceAll(',', '')}.mp3`;
        const audioTranslationFileName = `translation_${audioFileName}`;


        console.log(text,'======', translation);

        const audioPath = `./audio/phrases/${audioFileName}`;
        const audioTranslationPath = `./audio/phrases/translation_${audioFileName}`;
        await generateAudio(text, 'sv-SE', 'Mattias',  audioPath);
        await generateAudio(translation, 'en-US', 'Matthew plus',  audioTranslationPath);

        result.push({
            text,
            translation,
            audio: audioPath,
            audioTranslation: audioTranslationPath
        })

        fs.writeFileSync('some.json', JSON.stringify(result, null, 2));
    }
})();