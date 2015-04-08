"use strict";

module.exports = /*@ngInject*/ function(authorizationService) {

    var Registration = function() {
        this.__username = null;
        this.__email = null;
        this.__password = null;
    };

    Registration.prototype = {

        get username() {
            return this.__username;
        },

        set username(username) {
            this.__username = username;
        },

        get email() {
            return this.__email;
        },

        set email(email) {
            this.__email = email;
        },

        get password() {
            return this.__password;
        },

        set password(password) {
            this.__password = password;
        },

        clear: function() {
            this.__username = null;
            this.__email = null;
            this.__password = null;
        },

        getData: function() {
            return {
                username: this.__username,
                email: this.__email,
                password: this.__password
             };
        },

        isFilled: function() {
            return this.__username != null && this.__password != null && this.__email != null;
        },

        register: function(successCallback, errorCallback) {
            return authorizationService.register(this.getData());
        }

    };

    return Registration;

};