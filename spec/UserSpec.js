describe('User', function(){
  
  var user;

    beforeEach(function(){
      let = firstName = "John";
      let = surname = "Doe";
      let = email = "JohnDoe@Gmail.com"
      let = password = "John123"
      user = new User();
    });


  describe('Defaults', function(){

    it('Can be an instance of User', function(){
      expect(user).toBeInstanceOf(User);
    });
  });

  describe('Sign Up',function(){
    it('Can be an instance of User', function(){

      user.signUp(firstName, surname, email, password);
      expect(user.firstName).toEqual("John");
      expect(user.surname).toEqual("Doe");
      expect(user.email).toEqual("JohnDoe@Gmail.com");
      expect(user.password).toEqual("John123");
    });
  });

});