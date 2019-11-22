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

  describe('Database Methods', () => {

    beforeEach(() => {
      User.clear();
      User.init();
    })

    it('Registers a User', async () => {

      const user = await User.register(firstName, surname, email, password, password);
      expect(user.firstName).toEqual(firstName);
      expect(user.lastName).toEqual(surname);
      expect(user.email).toEqual(email);
      // expect(user.surname).toEqual("Doe");
      // expect(user.email).toEqual("JohnDoe@Gmail.com");
      // expect(user.password).toEqual("John123");
    });
  });

  describe('checking credentials', () => {

    beforeEach(() => {
      User.clear();
      User.init();
    })

    it('checks if a password is too short', async () => {
      let = passwordShort = "John"

      User.register(firstName, surname, email, passwordShort, passwordShort).then(() => { }, (error) => {
        expect(error).toEqual("Too short, 8 char min");
      })
    });

    it('checks if a password is too long', () => {
      let = passwordLong = "John123toolongtoolongtoolongtoolongtoolongtoolongtoolong"

      User.register(firstName, surname, email, passwordLong, passwordLong).then(() => { }, (error) => {
        expect(error).toEqual("Too long, 30 char max");
      })
    });

    it('checks if a password has numbers', () => {
      let = passwordNoNum = "Johnnonum"

      User.register(firstName, surname, email, passwordNoNum, passwordNoNum).then(() => { }, (error) => {
        expect(error).toEqual("No number(s)");
      })
    });

    it('checks if a password has letters', () => {
      let = passwordNoLetter = "12345678"

      User.register(firstName, surname, email, passwordNoLetter, passwordNoLetter).then(() => { }, (error) => {
        expect(error).toEqual("No letter(s)");
      })
    });

    it('checks if a passwords match', () => {
      let = passwordOne = "john12345"
      let = passwordTwo = "john12346"

      User.register(firstName, surname, email, passwordOne, passwordTwo).then(() => { }, (error) => {
        expect(error).toEqual("Passwords do not match");
      })
    });

    it('checks if any fields are empty', () => {
      let = password = "john12345"
      let = firstName = ""

      User.register(firstName, surname, email, password, password).then(() => { }, (error) => {
        expect(error).toEqual("You left a field empty");
      })
    });
  });

});