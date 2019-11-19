const mysql = require('mysql');

const USER_TABLE = 'User';


function authenticateQuery(email) {
  const connection = mysql.createConnection({
    host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thelegend27',
    database: 'makersbnb'
});

  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${USER_TABLE} WHERE email = '${email}'`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

function registerQuery(firstName, lastName, email, password) {
  const connection = mysql.createConnection({
    host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thelegend27',
    database: 'makersbnb'
});

  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${USER_TABLE} (firstname, lastname, email, password)
    VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

module.exports = {
  authenticateQuery,
  registerQuery
};