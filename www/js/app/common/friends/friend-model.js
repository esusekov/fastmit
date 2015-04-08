"use strict";

module.exports = /*@ngInject*/ function(correspondenceModel) {

    function Friend(source) {
        this.__id = source.id;
        this.__username = source.username;
        this.__isOnline = source.isOnline || false;
        this.__isFriend = source.isFriend || true;
        this.__hasUnread = source.hasUnread || false;
        this.__photoUrl = source.photoUrl;
        this.__correspondence = new correspondenceModel();
    }

    Friend.prototype = {

        get correspondence() {
            return this.__correspondence;
        },

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

        get chatUrl() {
            return "#/app/chat/" + this.__id;
        },

        get hasUnread() {
          return this.__hasUnread;
        },

        online: function() {
            this.__isOnline = true;
        },

        offline: function() {
            this.__isOnline = false;
        },

        setHasUnread: function() {
            this.__hasUnread = true;
        },

        setNoUnread: function() {
            this.__hasUnread = false;
        },

        checkId: function(id) {
            return Number(this.__id) === Number(id);
        }

    };

    return Friend;
};