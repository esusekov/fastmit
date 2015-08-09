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
            console.log('SET TOKEN', token);
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

        logout() {
            return $http.post(urlsApi.logout, {token: this.__token});
        }

        forgotPassword(data) {
            return $http.post(urlsApi.forgot, data);
        }

        friendsList(data) {
            data = data || { };
            data.token = this.__token;
            console.log('TOKEN', data);
            return $http.post(urlsApi.friendsList, data);
        }

        potentialFriendsList(data) {
            data = data || { };
            data.token = this.__token;
            return $http.post(urlsApi.potentialFriendsList, data);
        }

        addFriend(id) {
            var data = {
                token: this.__token,
                friendId: id
            };
            return $http.post(urlsApi.addFriend, data);
        }

        deleteFriend(id) {
            var data = {
                token: this.__token,
                friendId: id
            };
            return $http.post(urlsApi.deleteFriend, data);
        }

        search(username) {
            var data = {
                token: this.__token,
                username: username
            };
            return $http.post(urlsApi.search, data);
        }

    }

    return new httpService();
};
