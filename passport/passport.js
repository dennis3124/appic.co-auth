var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(username, password, done) {
    User.findOne({email: username}, function (err, user) {
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