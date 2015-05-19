"use strict";

module.exports = /*@ngInject*/ function(UserModel) {

    class PotentialFriendModel extends UserModel {
        constructor(source) {
            super(source);
            this.__request = source.request || 'in';
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