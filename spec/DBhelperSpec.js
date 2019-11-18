describe('User', function(){
  
  var user;

  beforeEach(function(){
    dbHelper = new DBhelper();
  });


  describe('Defaults', function(){

    it('Can be an instance of User', function(){
      expect(dbHelper).toBeInstanceOf(DBhelper);
    });
  });
});