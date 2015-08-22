"use strict";

module.exports = /*@ngInject*/ function(encryptionService, typesMessagesConstants) {

    var TYPE_TEXT = typesMessagesConstants.TEXT;
    var TYPE_PHOTO = typesMessagesConstants.PHOTO;

    return {
        enc(publicKey, mes) {
            switch (mes.type) {
                case TYPE_TEXT:
                    mes.encodedText = encryptionService.encryptText(publicKey, mes.text);
                    break;

                case TYPE_PHOTO:
                    var passPhrase = encryptionService.generatePassPhrase();
                    mes.encodedPhotoData = encryptionService.encryptPhoto(passPhrase, mes.photoData);
                    mes.encodedPassPhrase = encryptionService.encryptText(publicKey, passPhrase);
                    break;
            }
        },

        dec(mes) {
            switch (mes.type) {
                case TYPE_TEXT:
                    mes.text = encryptionService.decryptText(mes.encodedText);
                    break;

                case TYPE_PHOTO:

                    break;
            }
        }
    };
};

