const express = require('express');
const app = express();
const path = require('path');
const User = require('./User');
const Space = require('./Space');
const DBhelper = require('./dbHelper')
const SpaceRequest = require('./SpaceRequest')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded());

app.get('/', async (req, res) => {
  res.render('index', {
    spaces: await Space.list()
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

app.post('/space/confirmation', async (req, res) => {

  const result = await DBhelper.query(`SELECT * FROM Space WHERE startdate = '${req.body.checkIn}'`);

  const id = result[0].id;
  const requestingUser = "guest"
  const checkIn = req.body.checkIn
  const checkOut = req.body.checkout
  const owner = result[0].owner
  const available = checkAvailable(checkIn, checkOut, result[0].startDate, result[0].endDate)

  function checkAvailable(checkIn, checkOut, start, end) {
    if ((start <= checkIn <= end) && (start <= checkOut <= end)) {
      return true;
    } else {
      return false;
    }
  };

  SpaceRequest.createRequest(id, requestingUser, checkIn, checkOut, owner, available).then(() => {
    res.render('confirmation')
  }, (err) => {
    res.redirect('/error')
  })
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

  User.register(firstName, surname, email, password, confirmPassword).then(() => {
    res.redirect('/login')
  }, (err) => {
    res.redirect('/error')
  })
})

app.get('/error', (req, res) => {
  res.render('error')
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.authenticate(email, password, res).then(() => {
    res.redirect('/')
  }, (err) => {
    res.redirect('/error')
  })
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

app.get('/list', (req, res) => {
  res.render('list')
});
