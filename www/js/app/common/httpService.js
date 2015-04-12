"use strict";

module.exports = /*@ngInject*/ function($http, urlsApi) {

    class httpService {
        constructor() {
            this.__token = null;
        }

        isToken() {
            return this.__token !== null;
        }

        setToken(token) {
            this.__token = token;
        }

        getToken(token) {
            return this.__token;
        }

        register(data) {
            return $http.post(urlsApi.registration, data);
        }

        login(data) {
            return $http.post(urlsApi.login, data);
        }

        forgotPassword(data) {
            return $http.get(urlsApi.forgot, data);
        }

        friendsList(data) {
            data.token = this.__token;
            return $http.get(urlsApi.friendsList, data);
        }

        potentialFriendsList(data) {
            data.token = this.__token;
            return $http.get(urlsApi.potentialFriendsList, data);
        }

    }


    return new httpService();
};
