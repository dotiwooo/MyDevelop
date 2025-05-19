const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const { load_photo_frame_folder } = require(path.join(process.cwd(), 'src/app/photo_frame/load_photo_frame_folder'));

const { get_photo_flame_folder_name_query }  = require(path.join(process.cwd(), 'src/database/select/get_photo_flame_folder_name_query'));

const get_photo_frame = async (req, res, app, express) => {
  console.log('get_photo_frame is running.');

  try {
    // フォトフレームフォルダ画像の読み込み
    load_photo_frame_folder(app, express);

    const photo_flame_folder_name = await get_photo_flame_folder_name_query();

    // フォルダパスを設定（暫定的に'/test'を追加）
    const FOLDER_PATH = path.join(process.cwd(), `picture/photo_frame/${photo_flame_folder_name.value}`);

    // フォルダ内のすべてのファイルをリストアップ
    const files = fs.readdirSync(FOLDER_PATH, { encoding: 'utf8' });

    // JPEGとPNGの画像だけをフィルタリング
    const photoList = files.filter(file => file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.jpg'));

    ejs.renderFile(path.join(process.cwd(), 'src/app/photo_frame/photo_frame.ejs'), { photoList }, (err, str) => {
      if (err) {
        console.error('Error rendering photo_frame.ejs:', err);
        res.status(500).send();
      } else {
        res.status(200).send(str);
      }
    });
  } catch (error) {
    console.error('Error fetching photo list:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { get_photo_frame };
