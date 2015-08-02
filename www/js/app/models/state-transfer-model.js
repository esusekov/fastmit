"use strict";

module.exports = /*@ngInject*/ function($timeout, statesTransferConstants) {
    class StateTransferModel {
        constructor(timeout) {
            this.timeout = timeout || 10 * 1000;
            this.value = statesTransferConstants.NONE;
        }

        transfer() {
            this.value = statesTransferConstants.TRANSFER;
        }

        transferred() {
            this.value = statesTransferConstants.TRANSFERRED;

            $timeout(() => {
                this.none();
            }, this.timeout);
        }

        notTransferred() {
            this.value = statesTransferConstants.NOT_TRANSFERRED;
        }

        none() {
            this.value = statesTransferConstants.NONE;
        }

        get isTransfer() {
            return this.value === statesTransferConstants.TRANSFER;
        }

        get isTransferred() {
            return this.value === statesTransferConstants.TRANSFERRED;
        }

        get isNotTransferred() {
            return this.value === statesTransferConstants.NOT_TRANSFERRED;
        }

        get isNone() {
            return this.value === statesTransferConstants.NONE;
        }
    }

    return StateTransferModel;
};