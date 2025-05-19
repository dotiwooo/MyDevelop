const path = require('path');
const fs = require('fs');

const post_photo_upload = (req, res) => {
    const folderName = req.body.folderName || req.query.folderName;
    const targetPath = path.join(__dirname, '../../../picture/photo_frame', folderName);

    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }

    const tempPath = req.file.path;
    const targetFile = path.join(targetPath, req.file.originalname);

    fs.rename(tempPath, targetFile, (err) => {
        if (err) {
            return res.status(500).send("Error uploading file.");
        }
        res.redirect('/photo_upload');
    });
};

module.exports = { post_photo_upload };
