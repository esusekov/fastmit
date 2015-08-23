"use strict";

module.exports = /*@ngInject*/ function(authorizationService) {

    var ChangePassword = function() {
        this.__oldPassword = null;
        this.__newPassword1 = null;
        this.__newPassword2 = null;
    };

    ChangePassword.prototype = {

        get oldPassword() {
            return this.__oldPassword;
        },

        set oldPassword(oldPassword) {
            this.__oldPassword = oldPassword;
        },

        get newPassword1() {
            return this.__newPassword1;
        },

        set newPassword1(newPassword1) {
            this.__newPassword1 = newPassword1;
        },

        get newPassword2() {
            return this.__newPassword2;
        },

        set newPassword2(newPassword2) {
            this.__newPassword2 = newPassword2;
        },

        clear: function() {
            this.__oldPassword = null;
            this.__newPassword1 = null;
            this.__newPassword2 = null;
        }

    };

    return ChangePassword;

};
