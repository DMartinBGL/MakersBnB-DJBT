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
      // expect(user.surname).toEqual("Doe");
      // expect(user.email).toEqual("JohnDoe@Gmail.com");
      // expect(user.password).toEqual("John123");
    });
  });

});