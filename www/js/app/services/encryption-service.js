"use strict";

module.exports = /*@ngInject*/ function($cryptico, $q, storageService) {

    var BITS = 1024;
    var _privateKey = null;

    function generatePassPhrase() {
        var array = new Uint8Array(100);

        window.crypto.getRandomValues(array);

        return new Array(array).map(elem => {
            return String.fromCharCode(elem % 95 + 32);
        }).join('');
    }

    return {
        createPrivateKey() {
            var passPhrase = generatePassPhrase();
            return $cryptico.generateRSAKey(passPhrase, BITS);
        },

        setPrivateKey(username, key) {
            return storageService.setKeyEncryption(username, key).then(() => {
                _privateKey = key;
            });
        },

        createPublicKey(privateKey) {
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
        }
    };
};
