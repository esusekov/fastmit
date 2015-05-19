"use strict";

module.exports = /*@ngInject*/ function(FriendModel) {

    class FriendsModel {
        constructor() {
            this.__list = [];
        }

        addFriend(data) {
            var friend = new FriendModel(data);
            this.__list.push(friend);
        }

        getFriends() {
            return this.__list;
        }

        getFriendById(id) {
            console.log('ID', id);
            var friends = this.__list;

            return friends.find(friend => {
                return Number(friend.id) === Number(id);
            });
        }

        setMessage(data) {
            var friendId = data.id_friend;
            var friend = this.getFriendById(friendId);
            if (friend != null) {
                friend.setMessage(data);
            }
        }

        hasFriend(id) {
            var list = this.getFriends();

            for (var i = 0; list.length; ++i) {
                if (list[i].id === id) {
                    return true;
                }
            }
            return false;
        }

        setFriend(data) {
            var friendId = data.id_friend;
            if (!this.hasFriend(friendId)) {
                this.addFriend(data);
            }
        }

        setFriends(data) {
            this.__list = data.map(friend => new FriendModel(friend));
        }

        updateFriends(data) {
            data.forEach(friend => {
                var oldFriend = this.getFriendById(friend.id);
                if (oldFriend !== undefined) {
                    oldFriend.update(friend);
                } else {
                    this.addFriend(friend);
                }
            });
        }

    }

    return FriendsModel;
};