"use strict";

module.exports = /*@ngInject*/ function(httpService, $q) {

    class UserModel {
        constructor(source) {
            this.__id = source.id;
            this.__username = source.username;
            this.__isOnline = source.isOnline || false;
            this.__isFriend = source.isFriend || false;
            this.__photoUrl = source.photoUrl;
            this.__color = source.color;
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

        get isFriend() {
            return this.__isFriend;
        }

        get color() {
            return this.__color;
        }
    }

    return UserModel;
};
