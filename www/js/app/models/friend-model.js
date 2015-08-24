"use strict";

module.exports = /*@ngInject*/ function(messagesBoxService) {

    class FriendModel {
        constructor(source) {
            this.__id = source.id;
            this.__username = source.username;
            this.__isOnline = source.isOnline || false;
            this.__isFriend = source.isFriend || true;
            this.__hasUnread = source.hasUnread || false;
            this.__photoUrl = source.photoUrl;
            this.__previewUrl = source.previewUrl;
            this.__color = source.color;
            this.__publicKey = source.publicKey;
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

        get previewUrl() {
            return this.__previewUrl;
        }

        get isOnline() {
            return this.__isOnline;
        }

        get color() {
            return this.__color;
        }

        get publicKey() {
            return this.__publicKey;
        }

        get messagesCount() {
            return messagesBoxService.getCountInboxMessages(this.__id);
        }

        update(source) {
            this.__username = source.username || this.__username;
            this.__isOnline = source.isOnline || this.__isOnline;
            this.__isFriend = source.isFriend || this.__isFriend;
            this.__hasUnread = source.hasUnread || this.__hasUnread;
            this.__photoUrl = source.photoUrl || this.__photoUrl;
            this.__previewUrl = source.previewUrl || this.__previewUrl;
            this.__color = source.color || this.__color;
            this.__publicKey = source.publicKey || this.__publicKey;
        }
    }

    return FriendModel;
};