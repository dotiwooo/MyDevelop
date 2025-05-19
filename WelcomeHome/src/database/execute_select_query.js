const path = require('path');

const { connect_db } = require(path.join(process.cwd(), 'src/database/connect_db'));

// クエリを実行する
const execute_select_query = async (query) => {
  try 
  {
    const connection = await connect_db();
    const result = await connection.query(query);
    console.log(`execute query success!`)
    return result;
  } 
  catch (err) 
  {
    throw err;
  }
};

module.exports = { execute_select_query };