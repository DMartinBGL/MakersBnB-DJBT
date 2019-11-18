//Class which stores the user information
class User{
  //defines the class variables
  
  constructor(){
    
    this.firstName;
    this.surname;
    this.email;
    this.password;
  }

  //Password validation function
  _passwordEqual(password, confirmPassword){
    if (password == confirmPassword){
      return true;
    } else{
      return false;
    }
  }

/*
Sign up function takes in user information,
sets the class variables to that information,
will then send this information to the DBHelper
*/
  signUp(firstName, surname, email, password, confirmPassword)
  {
    if (this._passwordEqual(password,confirmPassword)){
      this.firstName = firstName;
      this.surname = surname;
      this.email = email;
      this.password = password;
    } else {
      throw new Error("Passwords do not match!")
    }
  }
};

module.exports = User;