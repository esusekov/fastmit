"use strict";

var apiary_url = 'https://private-03570-fastmitapi.apiary-mock.com/some-secret-api/';
var main_url = 'http://95.85.8.141/some-secret-api/';
var test_chat_websocket = 'ws://localhost:8081';

module.exports = /*@ngInject*/ function() {
    return {
        login: main_url + 'login',
        logout: main_url + 'logout',
        registration: main_url + 'registration',
        forgot: main_url + 'forgot-password',
        getUserInfo: main_url + 'user/info',
        changeAvatar: main_url + 'user/change-avatar',
        changePassword: main_url + 'user/change-password',
        friendsList: main_url + 'friends',
        potentialFriendsList: main_url + 'potential-friends',
        addFriend: main_url + 'friends/add',
        deleteFriend: main_url + 'friends/delete',
        search: main_url + 'friends/search',
        photoByUrl: main_url + 'chat/get-photo',
        recoverPassword: main_url + 'recover-password',
        setDeviceToken: main_url + 'set-device-token',
        websocketInteraction: 'ws://95.85.8.141:8888/some-secret-api/websocket'
    }
};