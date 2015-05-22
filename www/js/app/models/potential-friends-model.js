"use strict";

module.exports = /*@ngInject*/ function(PotentialFriendModel) {

    class PotentialFriendsModel {
        constructor() {
            this._users = [];
            this._followers = [];
            this._followees = [];
        }

        get users() {
            return this._users;
        }

        get followers() {
            return this._followers;
        }

        get followees() {
            return this._followees;
        }

        setFriends(users) {
            this._users = users.map(user => new PotentialFriendModel(user));
            this._followers = this._users.filter(user => user.isFollower());
            this._followees = this._users.filter(user => user.isFollowee());
        }

        reset() {
            this._users = [];
            this._followers = [];
            this._followees = [];
        }
    }

    return PotentialFriendsModel;
};