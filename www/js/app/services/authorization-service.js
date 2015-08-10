"use strict";

module.exports = /*@ngInject*/ function(httpService,
    $q, chatService, storageService) {

    var isAuth = false;

    return {
        checkAuth() {
            return storageService.getAuthToken().then(data => {
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
                storageService.setAuthToken(token);
            }).then(() => {
                chatService.start();
            });
        },

        login(data) {
            return httpService.login(data).then(result => {
                isAuth = true;
                var token = result.data.token;
                httpService.setToken(token);
                storageService.setAuthToken(token);
            }).then(() => {
               chatService.start();
            });
        },

        logout() {
            return httpService.logout().then(() => {
                console.log('Logout');

                isAuth = false;
                chatService.finish();
                storageService.clearAll();
            });
        },

        forgotPassword(data) {
            return httpService.forgotPassword(data);
        }
    };
};
