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
        friendsList: main_url + 'friends',
        potentialFriendsList: main_url + 'potential-friends',
        addFriend: main_url + 'friends/add',
        deleteFriend: main_url + 'friends/delete',
        search: main_url + 'friends/search',
        websocketInteraction: test_chat_websocket // 'ws://95.85.8.141:8888/some-secret-api/websocket'
    }
};