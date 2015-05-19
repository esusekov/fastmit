"use strict";

module.exports = /*@ngInject*/ function(httpService, $q) {

    class UserModel {
        constructor(source) {
            this.__id = source.id;
            this.__username = source.username;
            this.__isOnline = source.isOnline || false;
            this.__isFriend = source.isFriend || false;
            this.__photoUrl = source.photoUrl;
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
    }

    return UserModel;
};
