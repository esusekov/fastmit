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

        setPhoto(messageId, photo) {
            if (!this.hasMessagesById(messageId)) {
                photosBox[messageId] = photo;

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

            this.forEachMessages(messageId => {
                var photo = photosBox[messageId];

                if (!photo.stateLoading.isLoaded) {
                    notLoadedPhotos.push(photo);
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
