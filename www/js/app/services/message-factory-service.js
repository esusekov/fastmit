"use strict";

module.exports = /*@ngInject*/ function(PhotoMessageModel,
    TextMessageModel, typesMessagesConstants) {

    return {
        create(opts) {
            var type = opts.type;

            if (type ===  typesMessagesConstants.TEXT) {
                return new TextMessageModel(opts);
            } else if (type === typesMessagesConstants.PHOTO) {
                return new PhotoMessageModel(opts);
            }
        }
    }
};
