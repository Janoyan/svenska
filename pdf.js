const fs = require('fs');

// Load JSON data
const data = JSON.parse(fs.readFileSync('jsons/current.json', 'utf8'));

// HTML header with Armenian font from Google Fonts
const htmlHeader = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Words and Translations</title>
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 0 10px;
    line-height: 1.5;
  }
  .entry {
  margin: auto;
    margin-bottom: 600px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
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
  }
  .original {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  .translation {
    font-size: 18px;
    font-family: "Noto Sans Armenian", Arial, sans-serif;
    color: #333;
  }
</style>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Armenian&display=swap" rel="stylesheet" />
</head>
<body>
<div id="container">
`;

// HTML footer
const htmlFooter = `
</div>
</body>
</html>
`;

// Build the body content
let bodyContent = '';

data.forEach(item => {
    bodyContent += `<div class="entry">\n`;
    if (item.image) {
        bodyContent += `  <img src="${item.image}" alt="Image for ${item.text}" />\n`;
    }
    bodyContent += `  <div class="original">${item.text}</div>\n`;
    bodyContent += `  <div class="translation">${item.translation}</div>\n`;
    bodyContent += `</div>\n`;
});

// Write to output HTML file
fs.writeFileSync('index.html', htmlHeader + bodyContent + htmlFooter, 'utf8');

console.log('HTML file generated: output.html');
