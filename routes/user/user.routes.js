var UserService = require('./user.service');
var UtilsModule = "Users";
module.exports = function(router, utils) {
    // Get All Users
    router.get('/', function(req, res) {
        UserService.get().then(function(users) {
            utils.responseBuilder.handleSuccess(UtilsModule, 'Get', res, users);
        }).catch(function(err) {
            if (err) {
                utils.responseBuilder.handleError(UtilsModule, 'Get', res, err);
            }
        })
    });

// Get single users
    router.get('/:id', function(req, res) {
        UserService.getById(req.params.id).then(function(user) {
            if(user) {
                utils.responseBuilder.handleSuccess(UtilsModule, 'Search', res, user);
            }
        }).catch(function(err) {
            utils.responseBuilder.handleError(UtilsModule,'Search', res, err);
        })
    });

//Save User
    router.post('/', function(req, res){
        UserService.create(req.body.user).then(function(responseObj) {
            utils.responseBuilder.handleSuccess(UtilsModule, 'Create', res, responseObj);
        }).catch( function(err) {
            var errObj = {
                message: ''
            };

            if (err.code === 11000) {
                errObj.message = 'Email already exists'
                utils.responseBuilder.handleError(UtilsModule, 'Create', res, errObj);
            } else {
                utils.responseBuilder.handleError(UtilsModule, 'Create', res, err);
            }
        })
    });

    return router;
};