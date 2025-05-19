const path = require('path');

const { execute_modify_query }  = require(path.join(process.cwd(), 'src/database/execute_modify_query'));

const update_photo_flame_folder_name_query = async (photo_flame_folder_name) => {
  try 
  {
    const query = `
      UPDATE dbo.settings SET value = '${photo_flame_folder_name}'
      WHERE label = 'フォトフレームフォルダ名'`;
    console.log(`execute query:${query}`)
    await execute_modify_query(query);
  } 
  catch (err) 
  {
    const error_message = `query failed:${err.message}`
    console.log(error_message);
    throw new Error(error_message);
  }
};

module.exports = { update_photo_flame_folder_name_query };