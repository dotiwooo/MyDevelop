const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const get_board = async (req, res) => {
  console.log(`get_board is running.`);
  
  // ファイルがない場合は作成
  const drawingsPath = path.join(process.cwd(), 'src/app/board/picture/drawings.json');
  try {
    if (!fs.existsSync(drawingsPath)) {
      fs.mkdirSync(path.dirname(drawingsPath), { recursive: true }); // ディレクトリがない場合は作成
      fs.writeFileSync(drawingsPath, JSON.stringify([]), 'utf8');
    }

    ejs.renderFile(path.join(process.cwd(), 'src/app/board/board.ejs'), {}, (err, str) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send(str);
      }
    });
  } catch (error) {
    console.error('Error creating or accessing drawings.json:', error);
    res.status(500).send('Internal Server Error');
  }
};

const get_drawing = async (req, res) => {
  console.log(`get_drawing is running.`);
  
  const drawingsPath = path.join(process.cwd(), 'src/app/board/picture/drawings.json');

  try {
    if (fs.existsSync(drawingsPath)) {
      res.sendFile(drawingsPath);
    } else {
      res.status(404).send('Drawings not found');
    }
  } catch (error) {
    console.error('Error accessing drawings.json:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { get_board, get_drawing };
