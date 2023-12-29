var express = require('express');
var router = express.Router();
const Plane = require('../models/plane');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/:planeName', function(req, res, next) {
  let planeName = req.params.planeName;
  let currentPlane = Plane.getPlaneByName(planeName);
  const planes = Plane.getAllPlanes();
  console.log(currentPlane);

  if (currentPlane) {
    res.render('article', { currentPlane, planes });
  } else {
    res.status(404).send('Plane not found');
  }
});

module.exports = router;
