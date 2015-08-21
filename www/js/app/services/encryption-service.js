"use strict";

module.exports = /*@ngInject*/ function($cryptico, $gibberish, $q, storageService, utf8) {

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

        createPrivateKey(passPhrase) {
            return $cryptico.generateRSAKey(passPhrase, BITS);
        },

        setPrivateKey(username, privateKey, passPhrase) {
            return storageService.setKeyEncryption(username, passPhrase).then(() => {
                _privateKey = privateKey;
            });
        },

        createPublicKey(privateKey) {
            console.log('PrivateKey', privateKey);
            return $cryptico.publicKeyString(privateKey);
        },

        checkKey(username) {
            return storageService.getKeyEncryption(username).then(passPhrase => {
                console.log(passPhrase);

                if (passPhrase != null) {
                    _privateKey = this.createPrivateKey(passPhrase);
                } else {
                    return $q.reject();
                }
            });
        },

        encryptText(publicKey, text) {
            return $cryptico.encrypt(utf8.encode(text), publicKey).cipher;
        },

        decryptText(text) {
            return utf8.decode($cryptico.decrypt(text, _privateKey).plaintext);
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
