"use strict";

var main_url = 'https://private-03570-fastmitapi.apiary-mock.com/some-secret-api';

module.exports = /*@ngInject*/ function() {

    return {
        login: main_url + '/login',

        logout: main_url + '/logout',

        registration: main_url + '/registration',

        forgot: main_url + '/forgot-password',

        friendsList: main_url + '/friends'
    };

};