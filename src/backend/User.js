const crypto = require('crypto');
const { authenticateQuery } = require('./dbHelper');
const { registerQuery } = require('./dbHelper');

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
      if (password === confirmPassword) {
        const result = await registerQuery(firstName, lastName, email, password);
        return new User(result.insertId, firstName, lastName, email);
      } else {
        throw ("Passwords don't match");
      }
    } else {
      throw ("Field left empty")
    }
  }
};

module.exports = User;