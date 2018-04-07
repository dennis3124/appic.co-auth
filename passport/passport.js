var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'Email'
}, function(username, password, done) {
    User.findOne({Email: username}, function (err, user) {
        if (err) {return done(err);}
        // User not found in DB

        if (!user) {
            return done(null, false, {
                message: 'User Not Found'
            });
        }

        // Return if password is wrong
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Password is incorrect'
            })
        }

        // If Credentials are correct, return user object
        return done(null, user);
    })
}));