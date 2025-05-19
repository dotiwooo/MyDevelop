const path = require('path');
const fs = require('fs').promises;

const post_board = async (req, res) => {
  console.log(`post_board is running.`);

  try {
    const drawingsData = req.body;
    const drawingsPath = path.join(process.cwd(), 'src/app/board/picture/drawings.json');

    // ファイル書き込み
    await fs.writeFile(drawingsPath, JSON.stringify(drawingsData), 'utf8');
    
    // 成功
    res.status(200).send();
  } catch (err) {
    // エラー
    console.error('Error writing to drawings.json:', err);
    res.status(500).send(err.message);
  }
};

module.exports = { post_board };
