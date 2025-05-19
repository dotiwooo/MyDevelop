const path = require('path');

const { connect_db } = require(path.join(process.cwd(), 'src/database/connect_db'));

// クエリを実行する
const execute_modify_query = async (query) => {
  try 
  {
    const connection = await connect_db();
    await connection.query(query);
    console.log(`execute query success!`)
  } 
  catch (err) 
  {
    throw err;
  }
};

module.exports = { execute_modify_query };