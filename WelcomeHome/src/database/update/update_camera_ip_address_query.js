const path = require('path');

const { execute_modify_query } = require(path.join(process.cwd(), 'src/database/execute_modify_query'));

const update_camera_ip_address_query = async (camera_ip_address) => {
  try {
    // トランザクションの開始
    let query = 'START TRANSACTION;';
    console.log(`execute query: ${query}`);
    await execute_modify_query(query);

    // DELETE文を実行
    query = "DELETE FROM dbo.settings WHERE label = 'カメラIPアドレス';";
    console.log(`execute query: ${query}`);
    await execute_modify_query(query);

    // 各IPアドレスをINSERT文として追加
    for (const ip of camera_ip_address) {
      query = `
        INSERT INTO dbo.settings (label, value, is_verified)
        VALUES ('カメラIPアドレス', '${ip}', 1);
      `;
      console.log(`execute query: ${query}`);
      await execute_modify_query(query);
    }

    // トランザクションのコミット
    query = 'COMMIT;';
    console.log(`execute query: ${query}`);
    await execute_modify_query(query);

    console.log('Query executed successfully');
  } catch (err) {
    const error_message = `Query failed: ${err.message}`;
    console.log(error_message);
    throw new Error(error_message);
  }
};

module.exports = { update_camera_ip_address_query };
