"use strict";

module.exports = /*@ngInject*/ function(MessageModel, TimeoutPhotoModel, eventer) {

    class InboxMessageModel extends MessageModel {
        constructor(opts) {
            super(opts);
            this.isMy = false;

            if (this.isTypePhoto) {
                this.timeout = new TimeoutPhotoModel(opts);
                this.photoUrl = opts.photoUrl;
                this.encodedPassPhrase = opts.encodedPassPhrase;

                this.timeout.on('timeout-finish', () => {
                    var messageId = this.messageId;
                    eventer.emit('remove-message', messageId);
                    eventer.emit('remove-photo', messageId);
                });
            } else if (this.isTypeText) {
                this.encodedText = opts.encodedText;
                this.text = null;
            }
        }

        getFormatStorage() {
            var message = this.getBaseFormat();

            if (this.isTypePhoto) {
                message.photoUrl = this.photoUrl;
                message.timeout = this.timeout.timeout;
                message.encodedPassPhrase = this.encodedPassPhrase;
            } else if (this.isTypeText) {
                message.text = this.text;
            }

            return message;
        }
    }

    return InboxMessageModel;
};
