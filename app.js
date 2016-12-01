/* File name : app
   Author's name : Noah Michael
   Website name : Budget Manager
   File description : This file contains the initialization of different variables is a .js type
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var budgetManager = require('./routes/budgetManager')

var app = express();

// Use mongoose to connect to MongoDB
var mongoose = require('mongoose');
var config = require('./config/globalVariables');
mongoose.connect(config.db);

// Include passport packages
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy;

// Initialize the passport packages for authorization
app.use(flash());
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Link to account model
var Account = require('./models/account');
passport.use(Account.createStrategy());

// Configure Facebook login
var facebookStrategy = require('passport-facebook').Strategy;

passport.use(new facebookStrategy({
    clientID: config.ids.facebook.clientID,
    clientSecret: config.ids.facebook.clientSecret,
    callbackURL: config.ids.facebook.callbackURL
}, function(accessToken, refreshToken, profile, cb) {
    // Checks if this Facebook profile is already in accounts collection
    Account.findOne({ oauthID: profile.id }, function(err, user){
      if(err) {
        console.log(err);
      }
      else {
        // If the user already exists, continue
        if (user != null) {
          cb(null, user);
        }
        else {
          // Valid Facebook user but not in MongoDB? Add the user
          user = new Account({
            oauthID: profile.id,
            username: profile.displayName,
            created: Date.now()
          });
          user.save(function(err){
            if(err) {
              console.log(err);
            }
            else {
              cb(null, user);
            }
          });
        }
      }
    });
  }
));

// Read/write users between Passport and MongoDB
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/budgetManager', budgetManager);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Make this file public
module.exports = app;
