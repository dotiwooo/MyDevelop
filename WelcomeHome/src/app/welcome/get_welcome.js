const ejs = require('ejs');
const path = require('path');

const { get_guest_name_query }  = require(path.join(process.cwd(), 'src/database/select/get_guest_name_query'));

const get_welcome = async (req, res) => {
  console.log(`get_welcome is runnning.`);

  // DBからゲスト名を取得
  const guest = await get_guest_name_query();
  const userName = guest.value || 'Guest';
  ejs.renderFile(path.join(process.cwd(), 'src/app/welcome/welcome.ejs'), { userName }, (err, str) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(str);
    }
  });
};

module.exports = { get_welcome };
