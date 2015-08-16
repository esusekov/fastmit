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
            } else if (this.isTypeText) {
                this.text = opts.text;
            }
        }

        getFormatReceiver() {
            var message = this.getBaseFormat();

            if (this.isTypePhoto) {
                message.photoData = this.photoData;
                message.timeout = this.timeout;
            } else if (this.isTypeText) {
                message.text = this.text;
            }

            return message;
        }
    }

    return OutboxMessageModel;
};
