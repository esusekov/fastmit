"use strict";

module.exports = /*@ngInject*/ function(httpService, $q, chatService, storageService, encryptionService) {

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
            var username =  data.username;
            var privateKey = encryptionService.createPrivateKey();

            data.publicKey = encryptionService.createPublicKey(privateKey);

            return httpService.register(data).then(result => {
                console.log(result);
                isAuth = true;
                var token = result.data.token;
                httpService.setToken(token);
                storageService.setAuthToken(token);
            }).then(() => {
                encryptionService.setPrivateKey(username, privateKey);
            }).then(() => {
                chatService.start();
            });
        },

        login(data) {
            var username = data.username;

            return encryptionService.checkKey(username).catch(() => {
                return $q.reject('access-denied');
            }).then(() => {
                return httpService.login(data);
            }).then(result => {
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
                chatService.stop();
                storageService.clearAll();
            });
        },

        forgotPassword(data) {
            return httpService.forgotPassword(data);
        }
    };
};
