const fs = require('fs');

// Load JSON data
const data = shuffle(JSON.parse(fs.readFileSync('jsons/current.json', 'utf8')));

// Get total word count
const totalWords = data.length;

// Get current date in day.month.year format
const today = new Date();
const formattedDate = `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// HTML header with Armenian font and script
const htmlHeader = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Words and Translations</title>
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 0 10px;
    line-height: 1.5;
  }
  .entry {
    margin: auto;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  
  .entry div {
    display: inline-block;
  }
  .entry img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: auto;
    margin-bottom: 10px;
    border-radius: 8px;
    width: 80%;
    object-fit: contain;
    cursor: pointer;
  }
  .original {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  .translation {
    font-size: 16px;
    font-family: "Noto Sans Armenian", Arial, sans-serif;
    color: #333;
     margin-left: 49px;
  }
  .summary {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian&display=swap" rel="stylesheet" />
</head>
<body>
<div id="container">
<div class="summary">Total words: ${totalWords} | Date: ${formattedDate}</div>
`;

const htmlFooter = `
</div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img[data-audio]').forEach(img => {
    img.addEventListener('click', () => {
      const audioBase64 = img.getAttribute('data-audio');
      const audio = new Audio(audioBase64);
      audio.play();
    });
  });
});
</script>
</body>
</html>
`;

// Build the body content
let bodyContent = '';

data.forEach(item => {
    bodyContent += `<div class="entry">\n`;

    if (item.image) {
        const audioAttr = item.audio ? ` data-audio="${item.audio}"` : '';
        bodyContent += `  <img src="${item.image}" alt="Image for ${item.text}"${audioAttr} />\n`;
    }

    bodyContent += `  <div class="original">${item.text}</div>\n`;
    bodyContent += `  <div class="translation">${item.translation}</div>\n`;
    bodyContent += `</div>\n`;
});

// Write to output HTML file
fs.writeFileSync('index.html', htmlHeader + bodyContent + htmlFooter, 'utf8');
console.log('HTML file generated: index.html');
