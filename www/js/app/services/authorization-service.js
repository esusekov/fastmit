"use strict";

module.exports = /*@ngInject*/ function(httpService, $q, chatService,
    storageService, encryptionService, pushNotificationService) {

    var isAuth = false;

    return {
        checkAuth() {
            return $q.all([
                storageService.getAuthToken(),
                storageService.getCurrentUserinfo()
            ]).then(values => {
                var token = values[0];
                var userinfo = values[1];

                console.log('AUTH SERVICE DATA', values);
                if (token != null && userinfo != null) {
                    return encryptionService.checkKey(userinfo.username).then(() => {
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
            var passPhrase = encryptionService.generatePassPhrase();
            var privateKey = encryptionService.createPrivateKey(passPhrase);
            data.publicKey = encryptionService.createPublicKey(privateKey);

            return httpService.register(data).then(result => {
                console.log(result);
                isAuth = true;
                var token = result.data.token;
                httpService.setToken(token);
                storageService.setAuthToken(token);
                storageService.setCurrentUserinfo(result.data.info);
            }).then(() => {
                encryptionService.setPrivateKey(username, privateKey, passPhrase);
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
                storageService.setCurrentUserinfo(result.data.info);
            }).then(() => {
               chatService.start();
            });
        },

        logout() {
            isAuth = false;
            chatService.stop();
            storageService.clearAll();

            httpService.logout().then(result => {
                console.log('LOGOUT', result);
            });

            //pushNotificationService.unregister().then(result => {
            //    console.log('UNREGISTER PUSH', result);
            //});
        }
    };
};
