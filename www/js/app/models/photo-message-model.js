"use strict";

module.exports = /*@ngInject*/ function(MessageModel, StateLoadingModel, globalConstants) {
    class PhotoMessageModel extends MessageModel {
        constructor(opts) {
            super(opts);

            this.timeout = opts.timeout || globalConstants.DEFAULT_TIMEOUT;
            this.stateLoading = new StateLoadingModel();
            this.photoUrl = opts.photoUrl;
            this.photoData = opts.photoData;
        }

        getMessageFormatReceiver() {
            var message = this.getBaseMessageFormatReceiver();
            message.photoData = this.photoData;
            message.timeout = this.timeout;

            return message;
        }
    }

    return PhotoMessageModel;
};
