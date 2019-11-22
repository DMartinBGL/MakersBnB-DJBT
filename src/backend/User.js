const crypto = require('crypto');
const { authenticateQuery, registerQuery, query } = require('./dbHelper');
var errorMessage;

class User {
  constructor(id, firstName, lastName, email, verified) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.verified = verified;
  }

  static async clear() {
    const result = await query('DROP TABLE User');
  }

  static async init() {
    const result = await query('CREATE TABLE User(id BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255), verified TINYINT(1))');
  }

  /*
  Returns instance of User if authentication
  is successful, otherwise an error is thrown
  */
  static async authenticate(email, password) {

    const passwordHash = crypto.createHmac('sha256', password)
      .digest('hex');
    const result = await authenticateQuery(email);
    const data = result[0];

    if (data && passwordHash === data.password) {
      return new User(data.id, data.firstname, data.lastname, data.email, data.verified);
    }
    else throw ('Unable to authenticate user');
  }

  /*
  Sign up function takes in user information,
  if registeration is successful, an instance of,
  user will be returned, otherwise an error is thrown
  */
  static async register(firstName, lastName, email, password, confirmPassword) {
    if (checkCredentials(firstName, lastName, email, password, confirmPassword) === true) {
      const result = await registerQuery(firstName, lastName, email, password);
      return new User(result.insertId, firstName, lastName, email);
    } else {
      throw (errorMessage)
    }
  }
};

function checkCredentials(firstName, lastName, email, password, confirmPassword) {
  if (password.length < 7) {
    (errorMessage = "Too short, 8 char min");
  } else if (password.length > 30) {
    (errorMessage = "Too long, 30 char max");
  } else if (password.search(/\d/) == -1) {
    (errorMessage = "No number(s)");
  } else if (password.search(/[a-zA-Z]/) == -1) {
    (errorMessage = "No letter(s)");
  } else if (password !== confirmPassword) {
    (errorMessage = "Passwords do not match")
  } else if (firstName == "" || lastName == "" || email == "" || password == "" || confirmPassword == "") {
    (errorMessage = "You left a field empty");
  } else { return true; }
}


module.exports = User;