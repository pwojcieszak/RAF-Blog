var express = require('express');
var router = express.Router();
const Plane = require('../models/plane');
const planes = Plane.getAllPlanes();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { planes });
});

/* GET login view. */
router.get('/login', function(req, res, next) {
  const user = req.session.user || null;

  // Check if user is defined before accessing properties
  if (user) {
    res.redirect('/');
  } else {
    res.render('login', { planes });
  }
});

/* GET register view. */
router.get('/register', function(req, res, next) {
  const user = req.session.user || null;

  // Check if user is defined before accessing properties
  if (user) {
    res.redirect('/');
  } else {
    res.render('register', { planes });
  }
});

/* GET article page. */
router.get('/:planeName', function(req, res, next) {
  let planeName = req.params.planeName;
  let currentPlane = Plane.getPlaneByName(planeName);
  console.log(currentPlane);

  if (currentPlane) {
    res.render('article', { currentPlane, planes });
  } else {
    res.status(404).send('Plane not found');
  }
});


module.exports = router;
