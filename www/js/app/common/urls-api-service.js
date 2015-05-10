"use strict";

var main_url = 'https://private-03570-fastmitapi.apiary-mock.com/some-secret-api/';
//var main_url = 'http://95.85.8.141/some-secret-api/';

var urls = [
    'login',
    'logout',
    'registration',
    'forgot-password',
    'friends'
];

module.exports = /*@ngInject*/ function() {
    var urlsApi = {};

    urls.forEach(url => {
        urlsApi[url.replace('-', '')] = main_url + url;
    });

    console.log(urlsApi);
    return urlsApi;
};