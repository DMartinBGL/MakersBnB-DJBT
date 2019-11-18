describe('User', function(){
  
  describe('Defaults', function(){

    beforeEach(function(){
      var user = new User;
    });

    it('Can be an instance of User', function(){
      expect(user).toBeInstanceOf(User);
    });

  });

});