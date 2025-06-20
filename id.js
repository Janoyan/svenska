const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');

const directoryPath = './source';

function isAudioUrl(audio) {
    return typeof audio === 'string' && /^https?:\/\//i.test(audio);
}

async function downloadAndConvertToBase64(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const contentType = response.headers['content-type'] || 'audio/mpeg';
        const base64 = Buffer.from(response.data).toString('base64');
        return `data:${contentType};base64,${base64}`;
    } catch (err) {
        console.error(`❌ Failed to download audio from URL "${url}": ${err.message}`);
        return null;
    }
}

async function concatJsonFilesWithIds(outputFilePath) {
    try {
        const files = await fs.readdir(directoryPath);
        const jsonFiles = files.filter(file => path.extname(file) === '.json');

        const allData = [];

        for (const file of jsonFiles) {
            const filePath = path.join(directoryPath, file);
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                const obj = JSON.parse(content);

                if (obj.audio && isAudioUrl(obj.audio)) {
                    const base64Audio = await downloadAndConvertToBase64(obj.audio);
                    if (base64Audio) {
                        obj.audio = base64Audio;
                        // Save modified object back to file
                        await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
                        console.log(`🔄 Replaced audio URL in ${file}`);
                    }
                }

                obj.id = file.replace('.json', '');

                if (!obj.done) {
                    allData.push(obj);
                }

            } catch (err) {
                console.error(`❌ Error processing "${file}": ${err.message}`);
            }
        }

        await fs.writeFile(outputFilePath, JSON.stringify(allData, null, 2));
        console.log(`✅ Combined ${jsonFiles.length} files into "${outputFilePath}" with ${allData.length} records.`);
    } catch (err) {
        console.error('❌ Error reading directory:', err.message);
    }
}

(async () => {
    await concatJsonFilesWithIds('./jsons/current.json');
})();
