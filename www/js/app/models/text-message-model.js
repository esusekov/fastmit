"use strict";

module.exports = /*@ngInject*/ function(MessageModel) {

    class TextMessageModel extends MessageModel {
        constructor(opts) {
            super(opts);

            this.text = opts.text;
        }

        getMessageFormatReceiver() {
            var message = this.getBaseMessageFormatReceiver();
            message.text = this.text;

            return message;
        }
    }

    return TextMessageModel;
};
