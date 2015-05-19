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

        forgotPassword(data) {
            return $http.get(urlsApi.forgot, data);
        }

        friendsList(data) {
            data.params = {
                token: this.__token
            };
            console.log('TOKEN', data);
            return $http.get(urlsApi.friendsList, data);
        }

        potentialFriendsList(data) {
            data.params = {
                token: this.__token
            };
            return $http.get(urlsApi.potentialFriendsList, data);
        }

        addFriend(id) {
            var data = {
                params: {
                    token: this.__token,
                    friendId: id
                }
            };
            return $http.get(urlsApi.addFriend, data);
        }

        deleteFriend(id) {
            var data = {
                params: {
                    token: this.__token,
                    friendId: id
                }
            };
            return $http.get(urlsApi.deleteFriend, data);
        }

        search(username) {
            var data = {
                params: {
                    token: this.__token,
                    username: username
                }
            };
            return $http.get(urlsApi.search, data);
        }

    }

    return new httpService();
};
