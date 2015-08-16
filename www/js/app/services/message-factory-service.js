"use strict";

module.exports = /*@ngInject*/ function(OutboxMessageModel, InboxMessageModel) {

    return {
        createIn(opts) {
            return new InboxMessageModel(opts);
        },

        createOut(opts) {
            return new OutboxMessageModel(opts);
        }
    }
};
