var express = require('express');
var router = express.Router();
const usersData = require('../data/users');
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.post('/login', function(req, res, next) {
  const { email, password } = req.body;
  console.log('Received credentials:', email, password);

  const user = usersData.find(user => user.email === email);
  console.log('Found user:', user);

  if (user && bcrypt.compareSync(password, user.password)) {
    // Store user information in the request object
    req.session.user = {
      nickname: user.nickname,
      email: user.email,
    };
    res.redirect('../')
  } else {
    console.log('Login failed');
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

/* POST register page. */
router.post('/register', function(req, res, next) {
  const { nickname, email, password } = req.body;
  console.log('Received credentials:', email, password);

  const user = usersData.find(user => user.email === email);

  if (!user) {
    // Store user information in the request object
    req.session.user = {
      nickname: nickname,
      email: email,
    };
    usersData.push({
      nickname: nickname,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });
    res.redirect('../')
  } else {
    console.log('Registration failed');
    res.status(401).json({ message: 'Already created account with given e-mail address' });
  }
});

// Endpoint to Get a logout
router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('../');
});

module.exports = router;
