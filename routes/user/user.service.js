var User = require('./user.model');
var Promise = require('bluebird');

// Get all users
function getAllUsers() {
    return User.find({}, function(err, users) {
        if (err) {
            Promise.reject({
                success: false,
                message: err
            })
        }
        return Promise.resolve(users);
    })
}

// Get user by Id
function getUserById(id) {
    return User.find({
        _id: id
    }, function(err, user) {
        if (err) {
            Promise.reject(err);
        }
        return Promise.resolve(user);
    })
}

// Search User based on field
function searchUsers(field) {
    return User.find(field);
}

// Create new user
function createNewUser(userObj) {
    var user = new User(userObj);
    user.setPassword(userObj.password);
    return new Promise(function(resolve, reject) {
        user.save(function(err, user) {
            if (err) {return reject(err);}
            var token;
            token = user.generateJwt();
            var response = {
                token: token,
                user: user
            };
            return resolve(response);
        })
    })
}



module.exports = {
    get: getAllUsers,
    getById: getUserById,
    create: createNewUser
};
