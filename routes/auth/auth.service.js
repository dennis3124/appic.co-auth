var User = require('../user/user.model');
var Promise = require('bluebird');
var passport = require('passport');

function authenticate(req, res) {
    return new Promise(function(resolve, reject) {
        passport.authenticate('local', function(err, user, info) {
            var token;
            if (err) {
                reject(err);
            }


            // If user is found
            var responseObj;
            if (user) {
                token = user.generateJwt();
                 responseObj = {
                    user: user,
                    token: token
                };
                resolve(responseObj);
            } else {

                reject(info)
            }
        })(req,res);
    })
}

module.exports = {
    auth: authenticate
};