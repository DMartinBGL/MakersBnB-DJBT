import { createConnection } from 'mysql';
//Class which stores the user information
class User{
  //defines the class variables
  
  constructor(){
    this.firstName;
    this.surname;
    this.email;
    this.password;

    this.connection = createConnection({
      host: 'database-3.cdqdrq2hjhze.eu-west-2.rds.amazonaws.com',
      user: 'admin',
      password: 'thelegend27',
      database: 'makersbnb'
    });
    this.connection.connect((err) => {
      if (err) throw err;
      console.log('Connected!');
    });

  }

  //Password validation function
  passwordEqual(password, confirmPassword){
    return true
  }

/*
Sign up function takes in user information,
sets the class variables to that information,
will then send this information to the DBHelper
*/
  signUp(firstName, surname, email, password, confirmPassword)
  {
    if (this.passwordEqual(password,confirmPassword)){
      this.firstName = firstName;
      this.surname = surname;
      this.email = email;
      this.password = password;

      
      connection.query(`INSERT INTO User (firstname, lastname, email, password) VALUES (${this.firstname}, ${this.surname}, ${this.email}, ${this.password})`,(err) => {
        if(err) throw err;
      });

    } else {
      throw new Error("Passwords not working")
    }
  }
};
