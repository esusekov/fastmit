"use strict";

module.exports = /*@ngInject*/ function(OutboxMessageModel) {

    class TextOutMessageModel extends OutboxMessageModel {
        constructor(opts) {
            super(opts);
            this.text = opts.text;
        }

        getFormatReceiver() {
            var message = this.getBaseFormatReceiver();
            message.text = this.text;
            return message;
        }
    }

    return TextOutMessageModel;
};
