const mysql = require('mysql');



// auto closes connection
function query(statement) {
  const connection = mysql.createConnection({
    host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thelegend27',
    database: 'makersbnb'
});

  return new Promise((resolve, reject) => {
    connection.query(statement, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
}

module.exports = {
  query
};