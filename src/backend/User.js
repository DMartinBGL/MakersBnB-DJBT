const crypto = require('crypto');
const { authenticateQuery } = require('./dbHelper');
const { registerQuery } = require('./dbHelper');
var errorMessage;

class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
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
      return new User(result.insertId, data.firstname, data.lastname, data.email);
    }
    else throw ('Unable to authenticate user');
  }

  /*
  Sign up function takes in user information,
  if registeration is successful, an instance of,
  user will be returned, otherwise an error is thrown
  */
  static async register(firstName, lastName, email, password, confirmPassword) {
    if (firstName != "" && lastName != "" && email != "" && email.includes("@") && password != "" && confirmPassword != "") {
      if (checkPassword(password, confirmPassword) === true) {
        const result = await registerQuery(firstName, lastName, email, password);
        return new User(result.insertId, firstName, lastName, email);
      } else {
        throw (errorMessage);
      }
    } else {
      throw ("Field left empty")
    }
  }
};

function checkPassword(password, confirmPassword) {
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
  } else { return true; }
}


module.exports = User;