var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    phone: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: String
    },
    country: {
        type: String
    },
    company: [{
       type: Schema.Types.ObjectId
    }],
    favorites: [{
        type: Schema.Types.ObjectId
    }],
    following: [{
        type: Schema.Types.ObjectId
    }],
    type: {
        type: String,
        enum: [1, 2]
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
    var stringPwd = password.toString();
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.firstName + ' ' + this.lastName,
        exp: parseInt(expiry.getTime() / 1000),
    }, config.jwt.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', userSchema);