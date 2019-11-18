describe('User', function(){
  
  describe('Defaults', function(){

    var user;

    beforeEach(function(){
      user = new User;
    });

    it('Can be an instance of User', function(){
      expect(user).toBeInstanceOf(User);
    });
  });

});