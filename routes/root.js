var express = require('express');

module.exports = function(router, utils) {
    // Return message for root
    router.route('/').get(function(req, res) {
        res.send('Welcome to api root directory');
    });

    var userRouter = express.Router({
        mergeParams: true
    });

    router.use('/users', require('./user/user.routes')(userRouter, utils));


    var authRouter = express.Router({
        mergeParams: true
    });

    router.use('/auth', require('./auth/auth.routes')(authRouter, utils));


    return router;
};