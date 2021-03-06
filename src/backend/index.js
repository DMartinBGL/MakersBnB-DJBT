const express = require('express');
const session = require('express-session')
const dateFormat = require('dateformat');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const User = require('./User');
const Space = require('./Space');
const DBhelper = require('./dbHelper')
const SpaceRequest = require('./SpaceRequest')
const { verify } = require('./emailVerification');
const { sendVerificationEmail } = require('./mailer')

const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded());

app.use(session({
  secret: '343ji43j4n3jn4jk3n',
  saveUninitialized: false,
  resave: false
}))

app.get('/', async (req, res) => {
  let user;
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
  let user;
  try {
    user = JSON.parse(req.session.user)
  } catch {
    user;
  }

  Space.getOne(req.params.id).then((space) => {

    let startdate = dateFormat(space.startDate, "dd-mm-yyyy");
    let enddate = dateFormat(space.endDate, "dd-mm-yyyy");

    space.startDate = startdate;
    space.endDate = enddate;

    if (space) res.render('space', {
      space: space,
      user: user
    });
    else res.send('Non existent space');

  }, (error) => {
    res.send("Something wen't wrong");
  });
});

app.post('/space/confirmation', async (req, res) => {

  const result = await DBhelper.query(`SELECT * FROM Space WHERE '${req.body.checkIn}' BETWEEN startdate AND enddate`);

  const id = result[0].id;
  const requestingUser = "guest"
  const checkIn = req.body.checkIn
  const checkOut = req.body.checkout
  const owner = result[0].owner
  const available = checkAvailable(checkIn, checkOut, result[0].startdate, result[0].enddate)

  function checkAvailable(checkIn, checkOut, start, end) {
    let currentDate = new Date().toJSON().slice(0, 10);

    let startdate = JSON.stringify(start).slice(1, 11)
    let enddate = JSON.stringify(end).slice(1, 11)

    if ((checkIn >= currentDate) && (checkIn >= startdate) && (checkIn < enddate) && (checkOut <= enddate) && (checkOut >= currentDate) && (checkOut > checkIn)) {
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
  let user;
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
    sendVerificationEmail(email);
    res.redirect('/login')
  }, (err) => {
    res.redirect('/error')
  })
})

app.get('/error', (req, res) => {
  let user;
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
  let user;
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

app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      res.redirect('/error')
    } else {
      res.redirect('/')
    }
  });
});

if (process.env.ENV === "production") {
  app.use((req, res, next) => {
    if (!req.secure) {
      var secureUrl = "https://" + req.headers['host'] + req.url;
      res.writeHead(301, { "Location": secureUrl });
      res.end();
    }
  });

  https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/makers-project.xyz/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/makers-project.xyz/fullchain.pem')
  }, app).listen(443);
  console.log(`Serving HTTPS production on port 443`);
} else {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
  });
}


app.get('/verify-email/:token', (req, res) => {
  verify(req.params.token).then(() => {
    res.send("Email verified!")
  }, (err) => {
    res.send("could not verify")
  })
});

app.get('/list', (req, res) => {
  let user = req.session.user

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

app.post('/list', (req, res) => {
  const user = JSON.parse(req.session.user)
  const title = req.body.title;
  const description = req.body.description;
  const address = req.body.address;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const price = req.body.price;
  const owner = user["firstName"] + " " + user["lastName"]

  let today = new Date()

  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


  Space.add(title, address, startdate, enddate, owner, true, date, description, price).then(() => {
    res.redirect('/')
  }, (err) => {
    console.log(err)
    res.redirect('/error')
  })
});
