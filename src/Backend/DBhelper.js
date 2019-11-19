const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thelegend27',
    database: 'makersbnb'
});

// auto closes connection
function query(statement) {
  connection.connect((error) => {
    if (error) throw error;
  });

  return new Promise((resolve, reject) => {
    connection.query(statement, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });

    connection.end();
  });
}

module.exports = {
  query: query
};