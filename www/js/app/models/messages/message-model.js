"use strict";

module.exports = /*@ngInject*/ function(generateRandomId, typesMessagesConstants) {

    class MessageModel {
        constructor(opts) {
            this.id = opts.id || generateRandomId();
            this.time = opts.time || Date.now();
            this.type = opts.type;
        }

        get isTypeText() {
            return this.type === typesMessagesConstants.TEXT;
        }

        get isTypePhoto() {
            return this.type === typesMessagesConstants.PHOTO;
        }

        getBaseFormatReceiver() {
            return {
                id: this.id,
                time: this.time,
                type: this.type
            };
        }
    }

    return MessageModel;
};
