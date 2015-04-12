"use strict";

module.exports = /*@ngInject*/ function(authorizationService) {

    var Login = function() {
        this.__username = null;
        this.__password = null;
    };

    Login.prototype = {

        get username() {
            return this.__username;
        },

        set username(username) {
            this.__username = username;
        },

        get password() {
            return this.__password;
        },

        set password(password) {
            this.__password = password;
        },

        clear: function() {
            this.__username = null;
            this.__password = null;
        },

        getData: function() {
            return {
                username: this.__username,
                password: this.__password
            };
        },

        isFilled: function() {
            return this.__username != null && this.__password != null;
        },

        signIn: function() {
            return authorizationService.login(this.getData());
        }

    };

    return Login;
};