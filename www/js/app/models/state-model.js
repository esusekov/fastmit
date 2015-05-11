"use strict";

module.exports = /*@ngInject*/ function() {

    var States = {
        TRANSFER: 'transfer',//передается
        TRANSFERRED: 'transferred',//передано
        NOT_TRANSFERRED: 'not_transferred',//не передано
        NONE: 'none',
    };

    class StateModel {
        constructor() {
            this.value = States.NONE;
        }

        transfer() {
            this.value = States.TRANSFER;
        }

        transferred() {
            this.value = States.TRANSFERRED;
        }

        notTransferred() {
            this.value = States.NOT_TRANSFERRED;
        }

        none() {
            this.value = States.NONE;
        }

        isTransfer() {
            return this.value === States.TRANSFER;
        }

        isTransferred() {
            return this.value === States.TRANSFERRED;
        }

        isNotTransferred() {
            return this.value === States.NOT_TRANSFERRED;
        }

        isNone() {
            return this.value === States.NONE;
        }
    }

    return StateModel;
};