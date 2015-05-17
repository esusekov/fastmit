"use strict";

module.exports = /*@ngInject*/ function() {

    class PotentialFriendModel {
        constructor(source) {
            this.__id = source.id;
            this.__username = source.username;
            this.__photoUrl = source.photoUrl;
            this.__request = source.request || 'in';
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

        isFollower() {
            return this.__request === 'in';
        }

        isFollowee() {
            return this.__request === 'out';
        }

    }

    return PotentialFriendModel;
};