const path = require('path');

const { execute_select_query }  = require(path.join(process.cwd(), 'src/database/execute_select_query'));

const get_camera_ip_address_query = async () => {
  try 
  {
    const query = `
      SELECT value FROM dbo.settings
      WHERE label = 'カメラIPアドレス'`;
      console.log(`execute query:${query}`)
      const results = await execute_select_query(query);
    return results[0];
  } 
  catch (err) 
  {
    const error_message = `query failed:${err.message}`
    console.log(error_message);
    throw new Error(error_message);
  }
};

module.exports = { get_camera_ip_address_query };