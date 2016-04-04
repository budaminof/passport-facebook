var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
require('dotenv').load();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
    keys: [
        process.env.SECRET,
        process.env.SECRET2
    ]
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


//passport-facebook OAuth
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.HOST + '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log('===============================================================Passport');
    //   console.log('accessToken', accessToken);
    //   console.log('refreshToken', refreshToken);
      console.log('profile',profile);
    //   console.log('cb',cb);

    //User.will be a function for population the database which I dont have!
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null, {id: profile.id, displayName: profile.displayName ,token: accessToken});
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook',  { scope: ['public_profile'] }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    // successRedirect: '/',
    // failureRedirect: '/login'
  });

  passport.serializeUser(function(user, done) {
      done(null, user);
    });

  passport.deserializeUser(function(obj, done) {
      done(null, obj);
  });

  app.use(function (req, res, next) {
      if(req.session.passport) {
          res.locals.user = req.session.passport.user;
      }
    next();
    });

  app.use('/', routes);
  app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
