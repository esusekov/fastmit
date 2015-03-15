"use strict";

module.exports = /*@ngInject*/ function() {

    function User(source) {
        this.__id = source.id;
        this.__username = source.username;
        this.__isOnline = source.isOnline || false;
        this.__isFriend = source.isFriend || true;
        this.__photoUrl = source.photoUrl;
    }

    User.prototype = {
        get id() {
            return this.__id;
        },

        get username() {
            return this.__username;
        },

        get isOnline() {
            return this.__isOnline;
        },

        get isFriend() {
            return this.__isFriend;
        },

        get photoUrl() {
            return this.__photoUrl;
        },

        online: function() {
            this.__isOnline = true;
        },

        offline: function() {
            this.__isOnline = false;
        }
    };

    return User;
};