var express = require('express');
//Multer to handle uploads
var multer = require('multer');
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'temp/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
});
module.exports = function(router, utils) {
    // Return message for root
    router.route('/').get(function(req, res) {
        res.send('Welcome to api root directory');
    });

    var userRouter = express.Router({
        mergeParams: true
    });

    router.use('/users', require('./user/user.routes')(userRouter, utils, multer));


    var authRouter = express.Router({
        mergeParams: true
    });

    router.use('/auth', require('./auth/auth.routes')(authRouter, utils, multer));


    return router;
};