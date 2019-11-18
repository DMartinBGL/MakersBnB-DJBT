const { query } = require('../Backend/DBhelper');

class User {
  constructor(id, firstName, lastName, email) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  /*
  Sign up function takes in user information,
  if registeration is successful, an instance of,
  user will be returned, otherwise an error is thrown
  */
  static register(firstName, lastName, email, password, confirmPassword) {
    if (password === confirmPassword){
      query(
        `INSERT INTO User (firstname, lastname, email, password)
        VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`,
        (err, res) => {
          if (err) throw err;
          else return new User(res.insertId, firstName, lastName, email)
        });
    } else {
      throw new Error("Passwords don't match");
    }
  }
};