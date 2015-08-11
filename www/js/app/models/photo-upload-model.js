"use strict";

module.exports = /*@ngInject*/ function(StateLoadingModel) {
    
    class PhotoUploadModel {
        constructor() {
            this.photoData = null;
            this.stateLoading = new StateLoadingModel();
        }
    }

    return PhotoUploadModel;
};
