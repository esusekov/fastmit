"use strict";

module.exports = /*@ngInject*/ function() {

    class FriendModel {
        constructor(source) {
            this.__id = source.id;
            this.__username = source.username;
            this.__isOnline = source.isOnline || false;
            this.__isFriend = source.isFriend || true;
            this.__hasUnread = source.hasUnread || false;
            this.__photoUrl = source.photoUrl;
        }

        get chatUrl() {
            return "#/app/chat/" + this.__id;
        }

        get username() {
            return this.__username;
        }

        get id() {
            return this.__id;
        }

        get photoUrl() {
            return this.__photoUrl;
        }

        get isOnline() {
            return this.__isOnline;
        }

        update(source) {
            this.__username = source.username || this.__username;
            this.__isOnline = source.isOnline || this.__isOnline;
            this.__isFriend = source.isFriend || this.__isFriend;
            this.__hasUnread = source.hasUnread || this.__hasUnread;
            this.__photoUrl = source.photoUrl || this.__photoUrl;
        }
    }

    return FriendModel;
};