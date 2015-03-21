"use strict";

module.exports = /*@ngInject*/ function(authorization) {

    var Registration = function() {
        this.username =
        this.email    =
        this.password = null;
    };

    Registration.prototype = {

        clear: function() {
            this.username =
            this.email    =
            this.password = null;
        },

        getData: function() {
            return {
                username: this.username,
                email: this.email,
                password: this.password
            };
        },

        isFilled: function() {
            return this.username != null && this.password != null && this.email != null;
        },

        register: function(successCallback, errorCallback) {
            var self = this;
            authorization.register(
                self.getData(),
                function() {
                    self.clear();
                    successCallback();
                },
                errorCallback
            );
        }

    };

    return Registration;

};