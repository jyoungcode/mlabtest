// 이코드는 로그인 오류 처리 로직에 문제가 있지만, 이번장과는 무관해서 그냥진행
// load passport module
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require('../models/User');

passport.serializeUser(function(user, done) {
  // serialize the user for the session
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // deserialize the user
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// using local strategy
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {

  User.findOne({ email: email }, function(err, user) {
    if (!user) {
      // check errors and bring the messages
      return done(null, false, { msg: 'The email: ' + email + ' is already taken. '});
    }
    user.comparePassword(password, function(err, isMatch) {
      if (!isMatch) {
        // check errors and bring the messages
        return done(null, false, { msg: 'Invalid email or password' });
      }
      return done(null, user);
    });
  });

}));
