"use strict";

module.exports = /*@ngInject*/ function($http, urlsApi, $q) {

    var userToken = null;

    var img = 'data:image/jpeg;base64,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';

    function getFakePhoto() {
        return $q((resolve, reject) => {
            setTimeout(() => {
                resolve(img);
            }, 15 * 1000);
        });
    }


    return {
        isToken() {
            return token !== null;
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
            return $http.post(urlsApi.forgot, data);
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
            //var data = {
            //    token: userToken
            //};
            //
            //return $http.post(url, data);
            console.log('Get photo by url', url);

            return getFakePhoto();

        }
    };
};
