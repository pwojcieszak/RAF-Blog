var express = require('express');
var router = express.Router();
const User = require('../models/user');

/* POST login page. */
router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  console.log('Received credentials:', email, password);
  const user = await User.checkLoginCredentials(email, password);
  if (user) {
    // Store user information in the request object
    req.session.user = {
      nickname: user.nickname,
      email: user.email,
    };
    const returnTo = req.session.returnTo || '../';
    delete req.session.returnTo;
    res.redirect(returnTo);
  } else {
    res.redirect('../login?success=false')
  }
});

/* POST register page. */
router.post('/register', async function(req, res, next) {
  const { nickname, email, password } = req.body;
  console.log('Received credentials:', nickname, email, password);

  if (await User.registerUser(nickname, email, password)) {
    // Store user information in the request object
    req.session.user = {
      nickname: nickname,
      email: email,
    };
    
    const returnTo = req.session.returnTo || '../';
    delete req.session.returnTo;
    res.redirect(returnTo)
  } else {
    res.redirect('../register?success=false')
  }
});

// Endpoint to Get a logout
router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect(req.header('Referer') || '../');
});

module.exports = router;
