var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET home page. */
router.get('/canberra', function(req, res, next) {
  res.render('canberra');
});

/* GET home page. */
router.get('/hunter', function(req, res, next) {
  res.render('hunter');
});

/* GET home page. */
router.get('/lincoln', function(req, res, next) {
  res.render('lincoln');
});

/* GET home page. */
router.get('/meteor', function(req, res, next) {
  res.render('meteor');
});

/* GET home page. */
router.get('/valiant', function(req, res, next) {
  res.render('valiant');
});

/* GET home page. */
router.get('/venom', function(req, res, next) {
  res.render('venom');
});

module.exports = router;
