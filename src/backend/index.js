const express = require('express');
const app = express();
const path = require('path');
const User = require('./User')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.render('index', {
    name: 'suprise'
  });
});

app.get('/register', (req, res) => {
  res.render('registration')
});

app.post('/register', (req, res) => {
  const firstName = req.body.firstname;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmpassword
  
  User.register(firstName, surname, email, password, confirmPassword)
  
  res.redirect('/')
})

app.get('/login', (req, res) => {
  res.render('login')
});

app.get('/login/error', (req, res) => {
  res.render('loginError')
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  User.authenticate(email, password, res).then(()=>{
    res.redirect('/')
  },(err)=>{
    res.redirect('/login/error')
  })
});

app.listen(8000, () => {
  console.log('Example app listeniing on port 8000!')
});