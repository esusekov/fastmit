"use strict";

module.exports = /*@ngInject*/ function($localForage, globalConstants) {

    var AUTH_TOKEN_KEY = globalConstants.AUTH_TOKEN_KEY;
    var MESSAGES_BOX_KEY = globalConstants.MESSAGES_BOX_KEY;

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

        clearAll() {
            this.clearAuthToken();
            this.clearMessagesBox();
        }
    };
};
