var express = require('express');
var router = express.Router();
const Plane = require('../models/plane');
const planes = Plane.getAllPlanes();
const Comment = require('../models/comment');
const fs = require('fs');


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

  if (currentPlane) {
    const comments = Comment.getCommentsByName(planeName);
    res.render('article', { currentPlane, planes, comments });
  } else {
    res.status(404).send('Plane not found');
  }
});

/* POST add comment. */
router.post('/comments/post', function(req, res, next) {
  const { content, nickname, topic } = req.body;
  Comment.addComment(content, nickname, topic);
  res.redirect('/' + topic);
});

/* POST delete comment. */
router.post('/comments/delete', function(req, res, next) {
  const { content, nickname, topic } = req.body;
  console.log(content, nickname, topic);
  const deletionSuccessful = Comment.deleteCommentByDetails(content, nickname, topic);
  if (deletionSuccessful) {
    console.log('Comment deleted successfully');
  } else {
    console.log('Error deleting comment');
  }
  let formattedTopic = topic.charAt(0).toLowerCase() + topic.slice(1);
  res.redirect('/' + formattedTopic);
});


module.exports = router;
