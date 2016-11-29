/*  File name : index
    Author's name : Noah Michael
    Website name : Budget Manager
    File description : This file contains the GET and POST handlers for the register, login and logout pages and is a .js type
 */

var express = require('express');
var router = express.Router();

// Link to the account model for registration
var Account = require('../models/account');

// Define passport
var passport = require('passport');
var flash = require('connect-flash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Budget Manager',
    user: req.user
  });
});

/* GET the register page */
router.get('/register', function(req, res, next){
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

/* POST the register page */
router.post('/register', function(req, res, next){
  // Will use the account model and passport to create a new user
  Account.register(new Account({username: req.body.username}),
  req.body.password,
  function(err, account){
    if(err)
    {
      console.log(err);
      res.redirect('/register');
    }
    else
    {
      res.redirect('/login');
    }
  });
});

/* GET the login page */
router.get('/login', function(req, res, next) {
  var messages = req.session.messages || [];

  // Clear the session messages
  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });
});

/* POST the login page */
router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
  failureFlash: true
}));

/* GET logout */
router.get('/logout', function(req, res, next){
  // Log the user out and redirect to the home page
  req.logout();
  res.redirect('/');
});

module.exports = router;
