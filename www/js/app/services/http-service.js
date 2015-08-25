"use strict";

module.exports = /*@ngInject*/ function($http, urlsApi, $q) {

    var userToken = null;

    return {
        isToken() {
            return userToken !== null;
        },

        setToken(token) {
            console.log('SET TOKEN', token);
            userToken = token;
        },

        getToken() {
            return userToken;
        },

        register(data) {
            return $http.post(urlsApi.registration, data);
        },

        login(data) {
            return $http.post(urlsApi.login, data);
        },

        logout() {
            return $http.post(urlsApi.logout, {token: userToken});
        },

        forgotPassword(data) {
            return $http.get(urlsApi.forgot, {
                params: data
            });
        },

        recoverPassword(data) {
            return $http.post(urlsApi.recoverPassword, data);
        },

        getUserInfo() {
            return $http.post(urlsApi.getUserInfo, {token: userToken});
        },

        changeAvatar(avatar) {
            return $http.post(urlsApi.changeAvatar, {
                token: userToken,
                avatar: avatar
            });
        },

        changePassword(oldPassword, newPassword) {
            return $http.post(urlsApi.changePassword, {
                token: userToken,
                oldPassword: oldPassword,
                newPassword: newPassword
            });
        },

        friendsList(data) {
            data = data || { };
            data.token = userToken;
            console.log('TOKEN', data);
            return $http.post(urlsApi.friendsList, data);
        },

        potentialFriendsList(data) {
            data = data || { };
            data.token = userToken;
            return $http.post(urlsApi.potentialFriendsList, data);
        },

        addFriend(id) {
            var data = {
                token: userToken,
                friendId: id
            };
            return $http.post(urlsApi.addFriend, data);
        },

        deleteFriend(id) {
            var data = {
                token: userToken,
                friendId: id
            };
            return $http.post(urlsApi.deleteFriend, data);
        },

        search(username) {
            var data = {
                token: userToken,
                username: username
            };
            return $http.post(urlsApi.search, data);
        },

        getPhotoByUrl(url) {
            return $http.post(urlsApi.photoByUrl, {
                token: userToken,
                photoUrl: url
            });
        },

        setDeviceToken(deviceToken) {
            return $http.post(urlsApi.setDeviceToken, {
                token: userToken,
                deviceToken: deviceToken
            });
        }
    };
};
