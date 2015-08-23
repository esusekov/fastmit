"use strict";

module.exports = /*@ngInject*/ function(validationScheme, tv4, typesMessagesConstants) {

    var TEXT = typesMessagesConstants.TEXT;
    var PHOTO = typesMessagesConstants.PHOTO;

    function validate(data, schema) {
        return tv4.validate(data, schema);
    }

    function validateMessageByType(message) {
        switch (message.type) {
            case TEXT:
                return validate(message, validationScheme.TEXT);

            case PHOTO:
                return validate(message, validationScheme.PHOTO);
        }
    }

    return {
        validateMessage(data) {
            if (validate(data, validationScheme.MESSAGE)) {
                var message = data.body.message;
                return validateMessageByType(message);
            }

            return false;
        },

        validateMessages(data) {
            if (validate(data, validationScheme.MESSAGES)) {
                var friends = data.body;

                return friends.every(friend => {
                    var messages = friend.messages;

                    return messages.every(message => {
                        return validateMessageByType(message);
                    });
                });
            }

            return false;
        }
    };
};

