const ejs = require('ejs');
const path = require('path');

const get_top = async (req, res) => {
  console.log(`get_top is runnning.`);

  ejs.renderFile(path.join(process.cwd(), 'src/app/top/top.ejs'), { }, (err, str) => {
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

module.exports = { get_top };