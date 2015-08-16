"use strict";

module.exports = /*@ngInject*/ function(StateLoadingModel) {
    
    class PhotoUploadModel {
        constructor(opts) {
            this.messageId = opts.messageId;
            this.photoUrl = opts.photoUrl;
            this.stateLoading = new StateLoadingModel();

            var photoData = opts.photoData;

            if (photoData != null) {
                this.photoData = opts.photoData;
                this.stateLoading.loaded();
            } else {
                this.photoData = null;
                this.stateLoading.none();
            }
        }

        getFormatStorage() {
            return {
                messageId: this.messageId,
                photoUrl: this.photoUrl,
                photoData: this.photoData,
                stateLoading: this.stateLoading.value
            };
        }
    }

    return PhotoUploadModel;
};
