"use strict";

module.exports = /*@ngInject*/ function() {

    function User(source) {
        this.__id = source.id;
        this.__username = source.username;
        this.__photoUrl = source.photoUrl;
    }

    User.prototype = {
        get id() {
            return this.__id;
        },

        get username() {
            return this.__username;
        },

        get photoUrl() {
            return this.__photoUrl;
        },

        checkId: function(id) {
            return Number(this.__id) === Number(id);
        }

    };

    return User;
};