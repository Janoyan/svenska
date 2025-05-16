const fs = require('fs/promises');
const path = require('path');

const directoryPath = './source';
const outputFilePath = './jsons/current.json';

async function concatJsonFilesWithIds() {
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
                allData.push(obj);
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

concatJsonFilesWithIds();
