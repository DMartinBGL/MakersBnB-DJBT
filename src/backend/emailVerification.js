const { query } = require('./dbHelper.js');

async function init() {
  await query('CREATE TABLE EmailVerification(id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), token CHAR(40))');
}

async function add(email, token) {
  return await query(`INSERT INTO EmailVerification(email, token) VALUES('${email}', '${token}')`);
}

async function verify(token) {
  const result = await query(`SELECT * FROM EmailVerification WHERE token = '${token}'`);
  const data = result[0];

  if (data === undefined) throw new Error("Unable to verify");

  query(`UPDATE User SET verified = 1 WHERE email = '${data.email}'`);
  query(`DELETE FROM EmailVerification WHERE email = '${data.email}'`);
}

module.exports = {
  init,
  add,
  verify
};