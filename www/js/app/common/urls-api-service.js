"use strict";

var apiary_url = 'https://private-03570-fastmitapi.apiary-mock.com/some-secret-api/';
var main_url = 'http://95.85.8.141/some-secret-api/';

module.exports = /*@ngInject*/ function() {
    var urls_api = {};

    //var urls = [
    //    'login',
    //    'logout',
    //    'registration',
    //    'forgot-password',
    //    'friends',
    //    'potential-friends'
    //];

    //    logout: main_url + '/logout',
    //
    //    registration: main_url + '/registration',
    //
    //    forgot: main_url + '/forgot-password',
    //
    //    friendsList: main_url + '/friends',
    //
    //    potentialFriendsList: main_url + '/potential-friends'
    //};

    //urls.forEach(url => {
    //    urls_api[url] = main_url + url;
    //});

    //return urls_api;

    return {
        login: main_url + 'login',

        logout: main_url + 'logout',

        registration: main_url + 'registration',

        forgot: main_url + 'forgot-password',

        friendsList: apiary_url + 'friends',

        potentialFriendsList: apiary_url + 'potential-friends'
    }
};