const sql = require('mssql');

const getUserById = async (id) => {
  try {
    const result = await sql.query`SELECT * FROM Users WHERE id = ${id}`;
    return result.recordset[0];
  } catch (err) {
    throw new Error('Error fetching user: ' + err.message);
  }
};

module.exports = { getUserById };
