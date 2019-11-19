const { query } = require('./dbHelper');

const USER_TABLE = 'User';

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
  static async authenticate(email, password, res) {
    const result = await query(`SELECT * FROM ${USER_TABLE} WHERE email = '${email}'`);
    const data = result[0];
    
      if (data && password === data.password) {
        return new User(result.insertId, data.firstname, data.lastname, data.email);
      }
      else throw('Unable to authenticate user');
    
  }

  /*
  Sign up function takes in user information,
  if registeration is successful, an instance of,
  user will be returned, otherwise an error is thrown
  */
  static async register(firstName, lastName, email, password, confirmPassword) {
    if (firstname && lastName && email && password && confirmPassword) {
      if (password === confirmPassword){
        const result = await query(
          `INSERT INTO ${USER_TABLE} (firstname, lastname, email, password)
          VALUES ('${firstName}', '${lastName}', '${email}', '${password}');`
          );
  
        return new User(result.insertId, firstName, lastName, email);
      } else {
        throw("Passwords don't match");
      }
    } else{
      throw("Field left empty")
    }    
  }
};

module.exports = User;