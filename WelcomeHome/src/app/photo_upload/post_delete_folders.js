const path = require('path');
const fs = require('fs');

const post_delete_folders = (req, res) => {
    const folderName = req.body.folderName;
    const dir = path.join(__dirname, '../../../picture/photo_frame', folderName);

    if (fs.existsSync(dir)) {
        fs.rmdirSync(dir, { recursive: true });
        res.status(200).send('Folder deleted');
    } else {
        res.status(404).send('Folder not found');
    }
};

module.exports = { post_delete_folders };
