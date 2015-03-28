"use strict";

module.exports = /*@ngInject*/ function($localForage, $http, urlsApi) {

    var AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
    var token = null;

    return {

        checkAuth: function(successCallback, errorCallback) {
            $localForage.getItem(AUTH_TOKEN_KEY).then(data => {
                console.log(data);
                if (data != null) {
                    token = data;
                    if (successCallback != null) {
                        successCallback();
                    }
                } else {
                    if (errorCallback != null) {
                        errorCallback();
                    }
                }
            });
        },

        register: function(data, successCallback, errorCallback) {
            $http.post(urlsApi.registration, data).then(result => {
                console.log(result);
                token = result.data.token;
                if (successCallback != null) {
                    successCallback();
                }
            }).catch(() => {
                if (errorCallback != null) {
                    errorCallback();
                }
            });
        },

        login: function(data, successCallback, errorCallback) {
            $http.post(urlsApi.login, data).then(result => {
                token = result.data.token;
                $localForage.setItem(AUTH_TOKEN_KEY, token).then(function() {
                    if (successCallback != null) {
                        successCallback();
                    }
                });
            }).catch(() => {
                if (errorCallback != null) {
                    errorCallback();
                }
            });
        },

        logout: function(successCallback) {
            $localForage.removeItem(AUTH_TOKEN_KEY).then(() => {
                token = null;
                if (successCallback != null) {
                    successCallback();
                }
            });
        },

        forgotPassword: function(data, successCallback, errorCallback) {
            $http.get(urlsApi.forgot, data).then(() => {
                if (successCallback != null) {
                    successCallback();
                }
            }).catch(() => {
                if (errorCallback != null) {
                    errorCallback();
                }
            });
        },

        getToken: function() {
            return token;
        },

        isAuth: function() {
            return token != null;
        }

    };

};