var AuthService = require("./auth.service");
var UtilsModule = 'Auth';
module.exports = function(router, utils) {
    router.post('/', function(req, res) {
        if (!req.body.Email || !req.body.password) {
            utils.responseBuilder.handleValidationError(UtilsModule, 'Login', res, 'Missing Email/Password');
        }
        AuthService.auth(req, res).then(function(user) {
            utils.responseBuilder.handleSuccess(UtilsModule, 'Login', res, user);
        }).catch(function(err) {
            utils.responseBuilder.handleError(UtilsModule, 'Login', res, err);
        })
    });

    return router;
};