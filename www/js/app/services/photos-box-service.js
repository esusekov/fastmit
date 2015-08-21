"use strict";

module.exports = /*@ngInject*/ function(EventEmitter) {

    var photosBox = {};

    return Object.assign(new EventEmitter(), {
        getBox() {
            return photosBox;
        },

        getBoxFormatStorage() {
            var photosStorage = [];

            this.forEachPhotos(messageId => {
                var photoStorage = photosBox[messageId].getFormatStorage();
                photosStorage.push(photoStorage);
            });

            return photosStorage;
        },

        setPhoto(messageId, photoUpload) {
            if (!this.hasPhotoById(messageId)) {
                photosBox[messageId] = photoUpload;

                this.emit('save-in-storage');
            }
        },

        getPhoto(messageId) {
            return photosBox[messageId];
        },

        hasPhotoById(messageId) {
            return photosBox.hasOwnProperty(messageId);
        },

        removePhotoById(messageId) {
            if (this.hasPhotoById(messageId)) {
                delete photosBox[messageId];

                this.emit('save-in-storage');
            }
        },

        forEachPhotos(callback) {
            for (var key in photosBox) {
                if (this.hasPhotoById(key)) {
                    callback(key);
                }
            }
        },

        getNoLoadedPhotos() {
            var notLoadedPhotos = [];

            this.forEachPhotos(messageId => {
                var photoUpload = photosBox[messageId];

                if (!photoUpload.stateLoading.isLoaded) {
                    notLoadedPhotos.push(photoUpload);
                }
            });

            return notLoadedPhotos;
        },

        clearBox() {
            photosBox = {};
            this.emit('clear-storage');
        }
    });
};
