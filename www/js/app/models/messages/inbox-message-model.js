"use strict";

module.exports = /*@ngInject*/ function(MessageModel) {

    class InboxMessageModel extends MessageModel {
        constructor(opts) {
            super(opts);
            this.isMy = false;
        }
    }

    return InboxMessageModel;
};
