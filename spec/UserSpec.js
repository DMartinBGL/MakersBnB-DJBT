const User = require('../src/backend/User')

describe('User', () => {
  
  let user;

    beforeEach(() => {
      let = firstName = "John";
      let = surname = "Doe";
      let = email = "JohnDoe@Gmail.com"
      let = password = "John123"
      user = new User();
    });


  describe('Defaults', () => {

    it('Can be an instance of User', () => {
      expect(user).toBeInstanceOf(User);
    });
  });

  describe('Sign Up',() => {
    it('Can be an instance of User', () => {

      user.signUp(firstName, surname, email, password, password);
      expect(user.firstName).toEqual("John");
      expect(user.surname).toEqual("Doe");
      expect(user.email).toEqual("JohnDoe@Gmail.com");
      expect(user.password).toEqual("John123");
    });
  });

});