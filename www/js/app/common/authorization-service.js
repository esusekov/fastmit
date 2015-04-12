"use strict";

module.exports = /*@ngInject*/ function($localForage, httpService, $q) {

    class authorizationService {
        constructor() {
            this.AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
            this.isAuth = false;
        }

        checkAuth() {
            return $localForage.getItem(this.AUTH_TOKEN_KEY).then(data => {
                console.log(data);
                if (data != null) {
                    this.isAuth = true;
                    httpService.setToken(data.token);
                } else {
                    return $q.reject();
                }
            });
        }

        register(data) {
            return httpService.register(data).then(result => {
                console.log(result);
                this.isAuth = true;
                var token = result.data.token;
                httpService.setToken(token);
                $localForage.setItem(this.AUTH_TOKEN_KEY, token);
            });
        }

        login(data) {
            return httpService.login(data).then(result => {
                this.isAuth = true;
                var token = result.data.token;
                httpService.setToken(token);
                $localForage.setItem(this.AUTH_TOKEN_KEY, token);
            });
        }

        logout() {
            return $localForage.removeItem(this.AUTH_TOKEN_KEY).then(() => {
                this.isAuth = false;
            });
        }

        forgotPassword(data) {
            return httpService.forgotPassword(data);
        }

    }

    return new authorizationService();
};