"use strict";

module.exports = /*@ngInject*/ function($cryptico, $gibberish, $q, storageService) {

    var BITS = 1024;
    var _privateKey = null;

    return {
        generatePassPhrase() {
            var uintArray = new Uint8Array(100);
            window.crypto.getRandomValues(uintArray);
            var array = new Array();
            array.push.apply(array, uintArray);

            return array.map(function(elem) {
                return String.fromCharCode(elem % 95 + 32);
            }).join('');
        },

        createPrivateKey() {
            var passPhrase = this.generatePassPhrase();
            return $cryptico.generateRSAKey(passPhrase, BITS);
        },

        setPrivateKey(username, key) {
            return storageService.setKeyEncryption(username, key).then(() => {
                _privateKey = key;
            });
        },

        createPublicKey(privateKey) {
            console.log('PrivateKey', privateKey);
            return $cryptico.publicKeyString(privateKey);
        },

        checkKey(username) {
            return storageService.getKeyEncryption(username).then(key => {
                console.log(key);

                if (key != null) {
                    _privateKey = key;
                } else {
                    return $q.reject();
                }
            });
        },

        encryptText(publicKey, text) {
            return $cryptico.encrypt(text, publicKey);
        },

        decryptText(text) {
            $cryptico.decrypt(text, _privateKey);
        },

        encryptPhoto(passPhrase, photoData) {
            return $gibberish.enc(photoData, passPhrase);
        },

        decryptPhoto(encodedPassPhrase, photoData) {
            var passPhrase = this.decryptText(encodedPassPhrase);

            return $gibberish.dec(photoData, passPhrase);
        }
    };
};
