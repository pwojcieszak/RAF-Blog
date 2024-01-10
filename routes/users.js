var express = require('express');
var router = express.Router();
const User = require('../models/user');
const usersData = User.getAllUsers();
const bcrypt = require('bcryptjs');
const fs = require('fs');

/* POST login page. */
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
    res.redirect('../');
  } else {
    console.log('Login failed');
    res.redirect('../login?success=false')
  }
});

/* POST register page. */
router.post('/register', function(req, res, next) {
  const { nickname, email, password } = req.body;
  console.log('Received credentials:', nickname, email, password);

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

    // Saving edited array
    const jsonString = JSON.stringify(usersData, null, 2);
    fs.writeFile('data/users.json', jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('Array saved to JSON file successfully!');
      }
    });
      
    res.redirect('../')
  } else {
    console.log('Registration failed');
    res.status(401).json({ message: 'Already created account with given e-mail address' });
    res.redirect('../register?success=false')
  }
});

// Endpoint to Get a logout
router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('../');
});

module.exports = router;
