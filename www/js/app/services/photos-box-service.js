"use strict";

module.exports = /*@ngInject*/ function(EventEmitter) {

    var photosBox = {};

    return Object.assign(new EventEmitter(), {
        getBox() {
            return photosBox;
        },

        setPhoto(messageId, photo) {
            if (!this.hasMessagesById(messageId)) {
                photosBox[messageId] = photo;
            }
        },

        getPhoto(messageId) {
            return photosBox[messageId];
        },

        hasPhotoById(messageId) {
            return photosBox.hasOwnProperty(messageId);
        },

        clearBox() {
            photosBox = {};
            this.emit('clear-storage');
        }
    });
};
