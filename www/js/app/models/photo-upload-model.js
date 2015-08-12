"use strict";

module.exports = /*@ngInject*/ function(StateLoadingModel) {
    
    class PhotoUploadModel {
        constructor(opts) {
            this.messageId = opts.id;
            this.photoUrl = opts.photoUrl;
            this.photoData = null;
            this.stateLoading = new StateLoadingModel(opts.stateLoading);
        }

        getFormatStorage() {
            return {
                messageId: this.messageId,
                photoUrl: this.photoUrl,
                photoData: this.photoData,
                stateLoading: this.stateLoading.current
            };
        }
    }

    return PhotoUploadModel;
};
