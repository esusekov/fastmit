"use strict";

module.exports = /*@ngInject*/ function($localForage, globalConstants) {

    var AUTH_TOKEN_KEY = globalConstants.AUTH_TOKEN_KEY;
    var MESSAGES_BOX_KEY = globalConstants.MESSAGES_BOX_KEY;
    var PHOTOS_BOX_KEY = globalConstants.PHOTOS_BOX_KEY;
    var RSA_KEYS_ENCRYPTION_KEY = globalConstants.RSA_KEYS_ENCRYPTION_KEY;
    var CURRENT_USERINFO_KEY = globalConstants.CURRENT_USERINFO_KEY;


    function setItem(key, data) {
        return $localForage.setItem(key, data);
    }

    function getItem(key) {
        return $localForage.getItem(key);
    }

    function remove(key) {
        return $localForage.removeItem(key);
    }

    return {
        setMessagesBox(data) {
            return setItem(MESSAGES_BOX_KEY, data);
        },

        getMessagesBox() {
            return getItem(MESSAGES_BOX_KEY);
        },

        clearMessagesBox() {
            return remove(MESSAGES_BOX_KEY);
        },

        setAuthToken(data) {
            return setItem(AUTH_TOKEN_KEY, data);
        },

        getAuthToken() {
            return getItem(AUTH_TOKEN_KEY);
        },

        clearAuthToken() {
            return remove(AUTH_TOKEN_KEY);
        },

        setPhotosBox(data) {
            console.log('storage photos', data);
            
            return setItem(PHOTOS_BOX_KEY, data);
        },

        getPhotosBox() {
            return getItem(PHOTOS_BOX_KEY);
        },

        clearPhotosBox() {
            return remove(PHOTOS_BOX_KEY);
        },

        setKeyEncryption(key, data) {
            return setItem(key + RSA_KEYS_ENCRYPTION_KEY, data);
        },

        getKeyEncryption(key) {
            return getItem(key + RSA_KEYS_ENCRYPTION_KEY);
        },

        clearKeyEncryption(key) {
            return remove(key + RSA_KEYS_ENCRYPTION_KEY);
        },

        setCurrentUserinfo(data) {
            return setItem(CURRENT_USERINFO_KEY, data);
        },

        getCurrentUserinfo() {
            return getItem(CURRENT_USERINFO_KEY);
        },

        clearCurrentUserinfo() {
            return remove(CURRENT_USERINFO_KEY);
        },

        clearAll() {
            this.clearAuthToken();
            this.clearMessagesBox();
            this.clearPhotosBox();
            this.clearCurrentUserinfo();
        }
    };
};
