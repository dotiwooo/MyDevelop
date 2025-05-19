const path = require('path');
const fs = require('fs');

const get_load_folders = (req, res) => {
    const dir = path.join(__dirname, '../../../picture/photo_frame');
    const folders = fs.readdirSync(dir).map(folderName => {
        const folderPath = path.join(dir, folderName);
        const photos = fs.readdirSync(folderPath).filter(file => {
            return fs.lstatSync(path.join(folderPath, file)).isFile();
        });
        return { name: folderName, photos: photos };
    });
    res.json({ folders: folders });
};

module.exports = { get_load_folders };
