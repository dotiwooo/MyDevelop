const ejs = require('ejs');
const path = require('path');

const { get_camera_ip_address_query } = require(path.join(process.cwd(), 'src/database/select/get_camera_ip_address_query'));

const get_camera = async (req, res) => {
  console.log('get_camera is running.');
  
  let cameraIpAddress = await get_camera_ip_address_query();

  // データがオブジェクトの配列であることを確認し、必要に応じて整形
  if (!Array.isArray(cameraIpAddress)) {
    cameraIpAddress = [cameraIpAddress];
  }

  // IPアドレスのリストを抽出
  const ipAddressList = cameraIpAddress.map(item => item.value);

  try {
    ejs.renderFile(path.join(process.cwd(), 'src/app/camera/camera.ejs'), { 
      ip_address_list: ipAddressList,
    }, (err, str) => {
      if (err) {
        console.error('Error rendering camera.ejs:', err);
        res.status(500).send();
      } else {
        res.status(200).send(str);
      }
    });
  } catch (error) {
    console.error('Error rendering camera.ejs:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { get_camera };
