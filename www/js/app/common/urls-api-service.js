"use strict";

//var main_url = 'https://private-03570-fastmitapi.apiary-mock.com/some-secret-api/';
var main_url = 'http://95.85.8.141/some-secret-api/';

module.exports = /*@ngInject*/ function() {
    var urls_api = {};

    var urls = [
        'login',
        'logout',
        'registration',
        'forgot-password',
        'friends'
    ];

    urls.forEach(url => {
        urls_api[url] = main_url + url;
    });

    return urls_api;
};