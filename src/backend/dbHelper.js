const mysql = require('mysql');
const crypto = require('crypto');

const USER_TABLE = 'User';
const DATABASE = process.env.ENV === "test" ? "makersbnb_test" : "makersbnb";


function query(statement) {
  const connection = mysql.createConnection({
    host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thelegend27',
    database: DATABASE
});

  return new Promise((resolve, reject) => {
    connection.query(statement, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}


function authenticateQuery(email) {
  const connection = mysql.createConnection({
    host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thelegend27',
    database: DATABASE
});

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${USER_TABLE} WHERE email = '${email}'`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

function registerQuery(firstName, lastName, email, password) {

  const passwordHash = crypto.createHmac('sha256', password)
  .digest('hex');

  const connection = mysql.createConnection({
    host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thelegend27',
    database: DATABASE
});

  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${USER_TABLE} (firstname, lastname, email, password)
    VALUES ('${firstName}', '${lastName}', '${email}', '${passwordHash}');`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

module.exports = {
  query,
  authenticateQuery,
  registerQuery
};