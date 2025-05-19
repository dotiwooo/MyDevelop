const path = require('path');
const ejs = require('ejs');

const get_photo_upload = async (req, res) => {
  console.log(`get_photo_upload is runnning.`);

  ejs.renderFile(path.join(process.cwd(), 'src/app/photo_upload/photo_upload.ejs'), { }, (err, str) => {
    if (err)
    {
      res.status(500).send();
    }
    else
    {
      res.status(200).send(str);
    }
  });
};

module.exports = { get_photo_upload };
