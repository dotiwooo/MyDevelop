const path = require('path');
const fs = require('fs');

const { get_photo_flame_folder_name_query }  = require(path.join(process.cwd(), 'src/database/select/get_photo_flame_folder_name_query'));

const load_photo_frame_folder = async (app, express) => {
  const photo_flame_folder_name = await get_photo_flame_folder_name_query();
  const targetPath = `/picture/photo_frame/${photo_flame_folder_name.value}`;
  
  if (!fs.existsSync(path.join(process.cwd(), targetPath))) {
    fs.mkdirSync(path.join(process.cwd(), targetPath), { recursive: true });
  }
  
  app.use(targetPath, express.static(path.join(process.cwd(), targetPath)));

};

module.exports = { load_photo_frame_folder };
