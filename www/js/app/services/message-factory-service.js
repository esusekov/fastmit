"use strict";

module.exports = /*@ngInject*/ function(PhotoInMessageModel,
    PhotoOutMessageModel, TextInMessageModel, TextOutMessageModel, typesMessagesConstants) {

    function isTypePhoto(type) {
        return type ===  typesMessagesConstants.PHOTO;
    }

    function isTypeText(type) {
        return type === typesMessagesConstants.TEXT;
    }

    return {
        createIn(opts) {
            var type = opts.type;

            if (isTypeText(type)) {
                return new TextInMessageModel(opts);
            } else if (isTypePhoto(type)) {
                return new PhotoInMessageModel(opts);
            }
        },

        createOut(opts) {
            var type = opts.type;

            if (isTypeText(type)) {
                return new TextOutMessageModel(opts);
            } else if (isTypePhoto(type)) {
                return new PhotoOutMessageModel(opts);
            }
        }
    }
};
