"use strict";

module.exports = /*@ngInject*/ function(generateRandomId, typesMessagesConstants) {

    class MessageModel {
        constructor(opts) {
            this.messageId = opts.messageId || generateRandomId();
            this.time = opts.time || Date.now();
            this.type = opts.type;
        }

        get isTypeText() {
            return this.type === typesMessagesConstants.TEXT;
        }

        get isTypePhoto() {
            return this.type === typesMessagesConstants.PHOTO;
        }

        getBaseFormat() {
            return {
                messageId: this.messageId,
                time: this.time,
                type: this.type
            };
        }
    }

    return MessageModel;
};
