"use strict";

module.exports = /*@ngInject*/ function(InboxMessageModel) {

    class TextInMessageModel extends InboxMessageModel {
        constructor(opts) {
            super(opts);
            this.text = opts.text;
        }

        getFormatStorage() {
            var message = this.getBaseFormatStorage();
            message.text = this.text;
            return message;
        }
    }

    return TextInMessageModel;
};
