"use strict";

module.exports = /*@ngInject*/ function(httpService, $q, chatService, storageService, encryptionService) {

    var isAuth = false;

    return {
        checkAuth() {
            return $q.all([
                storageService.getAuthToken(),
                storageService.getCurrentUsername()
            ]).then(values => {
                var token = values[0];
                var username = values[1];

                console.log('AUTH SERVICE DATA', values);
                if (token != null && username != null) {
                    return encryptionService.checkKey(username).then(() => {
                        isAuth = true;
                        httpService.setToken(token);
                    });
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
                storageService.setCurrentUsername(username);
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
                storageService.setCurrentUsername(username);
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
