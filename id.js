const fs = require('fs/promises');
const path = require('path');

const directoryPath = './source';

async function concatJsonFilesWithIds(outputFilePath, secondApp) {
    try {
        const files = await fs.readdir(directoryPath);
        const jsonFiles = files.filter(file => path.extname(file) === '.json');

        const allData = [];

        for (const file of jsonFiles) {
            const filePath = path.join(directoryPath, file);
            try {
                const content = await fs.readFile(filePath, 'utf-8');
                const obj = JSON.parse(content);
                obj.id = file.replace('.json', '');

                if (secondApp && !obj.done) {
                    allData.push({
                        audio: obj.audio,
                        text: obj.text,
                        translation: obj.translation,
                    });
                } else {
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
    await concatJsonFilesWithIds('./jsons/second.json', true);
})()

