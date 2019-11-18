const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'thelegend27',
    database: 'makersbnb'
});

// auto closes connection
function query(statement, callback) {
  connection.connect((err) => {
    if (err) throw err;
  });

  connection.query(statement, callback);
  connection.end();
}

module.exports = {
  query: query
};