"use strict";

module.exports = /*@ngInject*/ function(MessageModel, TimeoutPhotoModel, eventer) {

    class InboxMessageModel extends MessageModel {
        constructor(opts) {
            super(opts);
            this.isMy = false;

            if (this.isTypePhoto) {
                this.timeout = new TimeoutPhotoModel(opts);
                this.photoUrl = opts.photoUrl;

                this.timeout.on('timeout-finish', () => {
                    var messageId = this.messageId;
                    eventer.emit('remove-message', messageId);
                    eventer.emit('remove-photo', messageId);
                });
            } else if (this.isTypeText) {
                this.text = opts.text;
            }
        }

        getFormatStorage() {
            var message = this.getBaseFormat();

            if (this.isTypePhoto) {
                message.photoUrl = this.photoUrl;
                message.timeout = this.timeout.timeout;
            } else if (this.isTypeText) {
                message.text = this.text;
            }

            return message;
        }
    }

    return InboxMessageModel;
};