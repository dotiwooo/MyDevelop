const path = require('path');
const fs = require('fs');

const post_delete_photo = (req, res) => {
    const { folderName, photoName } = req.body;
    const photoPath = path.join(__dirname, '../../../picture/photo_frame', folderName, photoName);

    if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
        res.status(200).send('Photo deleted');
    } else {
        res.status(404).send('Photo not found');
    }
};

module.exports = { post_delete_photo };
