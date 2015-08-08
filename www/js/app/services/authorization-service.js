"use strict";

module.exports = /*@ngInject*/ function($localForage,
    httpService, $q, chatService, globalConstants) {

    var isAuth = false;
    var AUTH_TOKEN_KEY = globalConstants.AUTH_TOKEN_KEY;

    return {
        checkAuth() {
            return $localForage.getItem(AUTH_TOKEN_KEY).then(data => {
                console.log('AUTH SERVICE DATA', data);
                if (data != null) {
                    isAuth = true;
                    httpService.setToken(data);
                } else {
                    return $q.reject();
                }
            }).then(() => {
                chatService.start();
            });
        },

        register(data) {
            return httpService.register(data).then(result => {
                console.log(result);
                isAuth = true;
                var token = result.data.token;
                httpService.setToken(token);
                $localForage.setItem(AUTH_TOKEN_KEY, token);
            }).then(() => {
                chatService.start();
            });
        },

        login(data) {
            return httpService.login(data).then(result => {
                isAuth = true;
                var token = result.data.token;
                httpService.setToken(token);
                $localForage.setItem(AUTH_TOKEN_KEY, token);
            }).then(() => {
               chatService.start();
            });
        },

        logout() {
            return $localForage.removeItem(AUTH_TOKEN_KEY).then(() => {
                isAuth = false;

                return httpService.logout();
            }).then(() => {
                chatService.stop();
            });
        },

        forgotPassword(data) {
            return httpService.forgotPassword(data);
        }
    };
};
