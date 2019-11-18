const mysql = require('mysql');

var connection;

function connect(){
      
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
}

function insert(user){
  connection.query(`INSERT INTO User (firstname, lastname, email, password) VALUES (${user.firstname}, ${user.surname}, ${user.email}, ${user.password})`)
}

