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
                this.encodedPhotoData = opts.encodedPhotoData;
                this.encodedPassPhrase = opts.encodedPassPhrase;
            } else if (this.isTypeText) {
                this.text = opts.text;
                this.encodedText = opts.encodedText;
            }
        }

        getFormatReceiver() {
            var message = this.getBaseFormat();

            if (this.isTypePhoto) {
                message.timeout = this.timeout;
                message.encodedPhotoData = this.encodedPhotoData;
                message.encodedPassPhrase = this.encodedPassPhrase;
            } else if (this.isTypeText) {
                message.encodedText = this.encodedText;
            }

            return message;
        }
    }

    return OutboxMessageModel;
};
