"use strict";

module.exports = /*@ngInject*/ function() {

    var RecoveryModel = function() {
        this.__email = null;
        this.__tmpPassword = null;
        this.__newPassword1 = null;
        this.__newPassword2 = null;
    };

    RecoveryModel.prototype = {
        get email() {
            return this.__email;
        },

        set email(email) {
            this.__email = email;
        },

        get tmpPassword() {
            return this.__tmpPassword;
        },

        set tmpPassword(tmpPassword) {
            this.__tmpPassword = tmpPassword;
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
            this.__email = null;
            this.__tmpPassword = null;
            this.__newPassword1 = null;
            this.__newPassword2 = null;
        }

    };

    return RecoveryModel;
};
