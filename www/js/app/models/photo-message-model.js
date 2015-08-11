"use strict";

module.exports = /*@ngInject*/ function(MessageModel,
    StateLoadingModel, TimeoutPhotoModel, eventer) {

    class PhotoMessageModel extends MessageModel {
        constructor(opts) {
            super(opts);

            this.timeout = new TimeoutPhotoModel(opts);
            this.stateLoading = new StateLoadingModel();
            this.photoUrl = opts.photoUrl;
            this.photoData = opts.photoData;

            this.timeout.on('timeout-finish', () => {
                eventer.emit('remove-message', this.id);
            });
        }

        getMessageFormatReceiver() {
            var message = this.getBaseMessageFormatReceiver();
            message.photoData = this.photoData;
            message.timeout = this.timeout.timeout;

            return message;
        }
    }

    return PhotoMessageModel;
};
