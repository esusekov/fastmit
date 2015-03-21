"use strict";

module.exports = /*@ngInject*/ function(authorization) {

    var Login = function() {
        this.username =
        this.password = null;
    };

    Login.prototype = {

        clear: function() {
            this.username =
            this.password = null;
        },

        getData: function() {
            return {
                username: this.username,
                password: this.password
            };
        },

        isFilled: function() {
            return this.username != null && this.password != null;
        },

        signIn: function(successCallback, errorCallback) {
            var self = this;
            authorization.login(
                self.getData(),
                function() {
                    self.clear();
                    successCallback();
                },
                errorCallback
            );
        }

    };

    return Login;
};