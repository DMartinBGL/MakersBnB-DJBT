const express = require('express');
const session = require('express-session')
const app = express();
const path = require('path');
const User = require('./User');
const Space = require('./Space');
var user;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded());

app.use(session({
  'secret': '343ji43j4n3jn4jk3n'
}))

app.get('/', async (req, res) => {

  try {
    user = JSON.parse(req.session.user)
  } catch {
    user;
  }

  res.render('index', {
    spaces: await Space.list(),
    user: user
  });
});

app.get('/space/:id', (req, res) => {
  Space.getOne(req.params.id).then((space) => {
    if (space) res.render('space', { space });
    else res.send('Non existent space');

  }, (error) => {
    res.send("Something wen't wrong");
  });
});

app.get('/register', (req, res) => {

  try {
    user = JSON.parse(req.session.user)
  } catch {
    user;
  }

  res.render('registration', {
    user: user
  });
});

app.post('/register', (req, res) => {
  const firstName = req.body.firstname;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmpassword

  User.register(firstName, surname, email, password, confirmPassword).then(() => {
    res.redirect('/login')
  }, (err) => {
    res.redirect('/error')
  })
})

app.get('/error', (req, res) => {
  try {
    user = JSON.parse(req.session.user)
  } catch {
    user;
  }

  res.render('error', {
    user: user
  });
});

app.get('/login', (req, res) => {
  try {
    user = JSON.parse(req.session.user)
  } catch {
    user;
  }

  res.render('login', {
    user: user
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.authenticate(email, password, res).then((user) => {
    req.session.user = JSON.stringify(user);
    res.redirect('/')
  }, (err) => {
    res.redirect('/error')
  })
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

app.get('/list', (req, res) => {

  var user = req.session.user

  if (user) {
    try {
      user = JSON.parse(req.session.user)
    } catch {
      user;
    }

    res.render('list', {
      user: user
    });
  } else {
    res.redirect('/login')
  }
});
