
function getUserInput(){
  console.log("1")
  var firstName = document.getElementById("firstname")
  var surname = document.getElementById("surname")
  var email = document.getElementById("email")
  var password = document.getElementById("password")
  var confirmPassword = document.getElementById("confirmpassword")

  var user = new User;
  user.signUp(firstName, surname, email, password, confirmPassword)
}