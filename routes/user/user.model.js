var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        required: true,
        unique: true,
        type: String
    },
    Phone: {
        type: String
    },
    Gender: {
        type: String
    },
    Age: {
        type: Number
    },
    State: {
        type: String
    },
    City: {
        type: String
    },
    Zip: {
        type: String
    },
    Country: {
        type: String
    },
    salt: String,
    hash: String
}, {
    collection: 'users',
    timestamps: true
});

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.Email,
        name: this.FirstName + ' ' + this.LastName,
        exp: parseInt(expiry.getTime() / 1000),
    }, config.jwt.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);