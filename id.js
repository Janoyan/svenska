const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const tmpData = require('./tmp.json');

const directoryPath = './source';
(async () => {
    if (tmpData.length) {
        await createFiles();
    }

    await concatJsonFilesWithIds('./jsons/current.json');
})();

async function createFiles() {
    try {
        const remainingData = [];

        for (const item of tmpData) {
            const fileName = `${item.text.replace(/\s+/g, '-')}.json`;
            const filePath = path.join(directoryPath, fileName);

            try {
                await fs.writeFile(filePath, JSON.stringify(item, null, 2));
                console.log(`✅ Created file: ${fileName}`);
            } catch (err) {
                console.error(`❌ Failed to write file "${fileName}": ${err.message}`);
                remainingData.push(item); // Keep in tmp.json if write fails
            }
        }

        // Update tmp.json to reflect removed items
        await fs.writeFile('./tmp.json', JSON.stringify(remainingData, null, 2));
        console.log('✅ Updated tmp.json');
    } catch (err) {
        console.error('❌ Error in createFiles:', err.message);
    }
}


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

