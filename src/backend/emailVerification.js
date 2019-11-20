const { query } = require('./dbHelper.js');

async function init() {
  await query('CREATE TABLE EmailVerification(id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255), token CHAR(40))');
}

async function add(email, token) {
  return await query(`INSERT INTO EmailVerification(email, token) VALUES('${email}', '${token}')`);
}

async function verify(token) {
  const result = await query(`SELECT * FROM EmailVerification WHERE token = '${token}'`);
  if (result[0]) {
    const email = result[0].email;
    
} else {
  throw new Error('unable to verify');
}

// const test = async()=>{
//   await init();
//   console.log('done');
// }