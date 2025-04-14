const fs = require('fs');

function processJsons(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        let items;
        try {
            items = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            return;
        }

        // Set sequential IDs
        items = items.map((item, index) => {
            return {
                ...item,
                id: index + 1,
            };
        });

        // Write back to the same file
        fs.writeFile(filePath, JSON.stringify(items, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
            } else {
                console.log('IDs updated successfully!');
            }
        });
    });

}

processJsons('jsons/current.json')
processJsons('jsons/shuffled.json')