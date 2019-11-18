const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
  res.render('index', {
    name: 'suprise'
  });
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.get('/register', (req, res) => {
  res.send('registration page')
});

app.listen(8000, () => {
  console.log('Example app listeniing on port 8000!')
});