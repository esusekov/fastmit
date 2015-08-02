"use strict";

module.exports = /*@ngInject*/ function(StateTransferModel, generateRandomId, typesMessagesConstants) {
    class MessageModel {
        constructor(opts) {
            this.id = opts.id || generateRandomId();
            this.time = opts.time || Date.now();
            this.text = opts.text;
            this.type = opts.type;
            this.isMy = opts.isMy || false;
            this.isRead = opts.isRead || false;
            this.timeout = opts.timeout || 10 * 1000;
            this.stateTransfer = new StateTransferModel();
        }

        get isTypeText() {
            return this.type === typesMessagesConstants.TEXT;
        }

        get isTypePhoto() {
            return this.type === typesMessagesConstants.PHOTO;
        }

        get formatForReciver() {
            return {
                id: this.id,
                time: this.time,
                text: this.text,
                type: this.type,
                timeout: this.timeout
            };
        }
    }

    return MessageModel;
};
