const ejs = require('ejs');
const path = require('path');

const { get_guest_name_query }  = require(path.join(process.cwd(), 'src/database/select/get_guest_name_query'));
const { get_camera_ip_address_query }  = require(path.join(process.cwd(), 'src/database/select/get_camera_ip_address_query'));
const { get_photo_flame_folder_name_query }  = require(path.join(process.cwd(), 'src/database/select/get_photo_flame_folder_name_query'));

const get_settings = async (req, res) => {
  console.log(`get_settings is runnning.`);
  
  // DBから設定情報を取得
  const guest = await get_guest_name_query();
  const cameraIpAddress = await get_camera_ip_address_query();
  const photoFlameFolderName = await get_photo_flame_folder_name_query();

  ejs.renderFile(path.join(process.cwd(), 'src/app/settings/settings.ejs')
                                        , { 
                                            guest_name:guest,
                                            camera_ip_address:cameraIpAddress,
                                            photo_flame_folder_name:photoFlameFolderName
                                          }
                                        , (err, str) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).send(str);
    }
  });
};

module.exports = { get_settings };
