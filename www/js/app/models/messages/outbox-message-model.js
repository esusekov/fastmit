"use strict";

module.exports = /*@ngInject*/ function(MessageModel, StateTransferModel) {

    class OutboxMessageModel extends MessageModel {
        constructor(opts) {
            super(opts);
            this.isMy = true;
            this.stateTransfer = new StateTransferModel();
        }
    }

    return OutboxMessageModel;
};
