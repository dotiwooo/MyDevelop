const path = require('path');
const { load_photo_frame_folder } = require(path.join(process.cwd(), 'src/app/photo_frame/load_photo_frame_folder'));

const { update_guest_name_query } = require(path.join(process.cwd(), 'src/database/update/update_guest_name_query'));
const { update_camera_ip_address_query } = require(path.join(process.cwd(), 'src/database/update/update_camera_ip_address_query'));
const { update_photo_flame_folder_name_query } = require(path.join(process.cwd(), 'src/database/update/update_photo_flame_folder_name_query'));

const post_settings = async (req, res, app, express) => {
  console.log(`post_settings is running.`);

  try {
    const { guest_name, camera_ip_address, photo_flame_folder_name } = req.body;

    // ゲスト名を更新
    await update_guest_name_query(guest_name);
    // カメラIPアドレスを更新
    await update_camera_ip_address_query(camera_ip_address);
    // フォトフレームフォルダ名を更新
    await update_photo_flame_folder_name_query(photo_flame_folder_name);
    await load_photo_frame_folder(app, express);

    // 成功
    res.status(200).send();
  } catch (err) {
    // エラー
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

module.exports = { post_settings };
