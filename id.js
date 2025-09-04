const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const uuid = require('uuid');
const qs = require('qs');
const tmpData = require('./tmp.json');
const sentencesJson = require('./jsons/sentences.json');

const directoryPath = './source';
(async () => {
    if (tmpData.length) {
        await createFiles();
    }

    await concatJsonFilesWithIds('./jsons/current.json');
    // await handleSentences('./jsons/sentences.json');
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

async function getBase64FromMp3Url(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'  // important to get raw binary data
        });
        const base64 = Buffer.from(response.data, 'binary').toString('base64');
        return `data:audio/mpeg;base64,${base64}`;
    } catch (error) {
        console.error('Error fetching or converting mp3:', error);
        throw error;
    }
}


async function getBase64Audio(text, voice) {
    console.log(text, voice);
    let data = qs.stringify({
        'token': 'ae5fb62c-d508-4210-9657-d3bb5d387ac7',
        'email': 'meruzh2008@gmail.com',
        voice,
        text,
        'format': 'mp3',
        'speed': '1.1',
        'pitch': '0',
        'emotion': 'good'
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://speechgen.io/index.php?r=api/text',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=da245571ba6c0eda1975294dd25242d5'
        },
        data : data
    };

    const result = await axios.request(config);

    return getBase64FromMp3Url(result.data.file);
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

                if (!obj.audio) {
                    const base64Audio = await getBase64Audio(obj.text, 'John');
                    if (base64Audio) {
                        obj.audio = base64Audio;
                        // Save modified object back to file
                        await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
                        console.log(`🔄 Added audio in ${file}`);
                    }
                }

                if (obj.translation.includes('և')) {
                    obj.translation = obj.translation.replaceAll('և', 'եվ');
                    await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
                    console.log(`🔄 replaced և in ${file}`);
                }

                if (!obj.armAudio) {
                    const base64Audio = await getBase64Audio(obj.translation, 'Vivienne HY');
                    if (base64Audio) {
                        obj.armAudio = base64Audio;
                        // Save modified object back to file
                        await fs.writeFile(filePath, JSON.stringify(obj, null, 2));
                        console.log(`🔄 Added armAudio in ${file}`);
                    }
                }

                obj.id = file.replace('.json', '');

                if (!obj.done) {
                    allData.push({
                        id: obj.id,
                        text: obj.text,
                        audio: obj.audio,
                        translation: obj.translation,
                        armAudio: obj.armAudio
                    });
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

async function handleSentences(outputFilePath) {
    try {
        const allData = sentencesJson;

        for (const record of sentencesJson) {
            try {
                if (!record.englishAudio) {
                    const base64Audio = await getBase64Audio(record.english, 'John');
                    if (base64Audio) {
                        record.englishAudio = base64Audio;
                        console.log(`🔄 Added audio for ${record.english}`);
                    }
                }

                // if (record.armenian.includes('և')) {
                //     record.armenian = record.translation.replaceAll('և', 'եվ');
                //     console.log(`🔄 replaced և in ${record.armenian}`);
                // }
                //
                //
                // if (!record.armenianAudio) {
                //     const base64Audio = await getBase64Audio(record.armenian, 'Vivienne HY');
                //     if (base64Audio) {
                //         record.armenianAudio = base64Audio;
                //         console.log(`🔄 Added audio for ${record.armenian}`);
                //     }
                // }

                if (!record.id) {
                    record.id = uuid.v4();
                }

                const index = allData.indexOf(record);

                allData[index] = record;
                await fs.writeFile(outputFilePath, JSON.stringify(allData, null, 2));
                console.log(`✅ "${outputFilePath}" with ${allData.length} records.`);

            } catch (err) {
                console.error(`❌ Error processing "${file}": ${err.message}`);
            }
        }

    } catch (err) {
        console.error('❌ Error reading directory:', err.message);
    }
}

