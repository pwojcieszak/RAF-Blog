var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/:planeName', function(req, res, next) {
  let planeName = req.params.planeName;
  res.render(planeName);
});

module.exports = router;
