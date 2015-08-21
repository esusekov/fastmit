"use strict";

module.exports = /*@ngInject*/ function(MessageModel, StateTransferModel) {

    class OutboxMessageModel extends MessageModel {
        constructor(opts) {
            super(opts);
            this.isMy = true;
            this.stateTransfer = new StateTransferModel();

            if (this.isTypePhoto) {
                this.timeout = opts.timeout;
                this.photoData = opts.photoData;
                this.encodedPassPhrase = null;
            } else if (this.isTypeText) {
                this.text = opts.text;
                this.encodedText = null;
            }
        }

        getFormatReceiver() {
            var message = this.getBaseFormat();

            if (this.isTypePhoto) {
                message.photoData = this.photoData;
                message.timeout = this.timeout;
                message.encodedPassPhrase = this.encodedPassPhrase;
            } else if (this.isTypeText) {
                message.encodedText = this.encodedText;
            }

            return message;
        }
    }

    return OutboxMessageModel;
};
