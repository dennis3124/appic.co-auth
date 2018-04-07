
/* Contains core utility functions */
module.exports = (function() {
    'use strict';

    // Verify MongoDB connectivtiy status

    var isMongoConnAlive = function(mongoose) {

        return mongoose.connection.readyState !== 1

    };

    // Response builder for all API responses.

    var responseBuilder = {
        handleSuccess: function(module, operation, res, data) {
            return res.status(200).json({
                success: true,
                body: {
                    "message": module + " " + operation + " is successful !",
                    "data": data
                }
            });
        },

        handleError: function(module, operation, res, data) {
            return res.status(500).json({
                success: false,
                body: {
                    "message": module + " " + operation + " is failed !",
                    "rootcause": data.message
                }
            });
        },

        handleNoDataError: function(module, operation, res, data) {
            return res.status(404).json({
                success: false,
                body: {
                    "message": module + " " + operation + " is failed !",
                    "rootcause": data.message
                }
            });
        },

        handleValidationError: function(module, res, message) {
            return res.status(400).json({
                success: false,
                body: {
                    "message": "Validation failed in " + module,
                    "rootcause": message
                }
            });
        }

    };


    return {
        isMongoConnAlive: isMongoConnAlive,
        responseBuilder: responseBuilder
    };
}());