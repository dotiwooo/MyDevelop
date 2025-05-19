// データベース接続
const mysql = require('mysql2/promise');

let config = '';
let connection = '';

// 開発環境or本番環境
const devflg = typeof(process.env.PORT === 'undefined');

if (devflg)
{
  // 開発環境
  config = 
  {
    host: process.env.DB_SERVER_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_DATABASE_DEV,
  };
}
else
{
  // 本番環境
  config = 
  {
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };
}

const connect_db = async () => {
  try 
  {
    if(!connection)
    {
      connection = await mysql.createConnection(config);
      console.log('データベース接続成功');
    }
  } 
  catch (err) 
  {
    console.error('データベース接続失敗: ', err.message);
    return;
  }

  return connection;
};

module.exports = { connect_db }