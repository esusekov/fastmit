"use strict";

module.exports = /*@ngInject*/ function(FriendModel) {

    class FriendsModel {
        constructor() {
            this.__list = [];
        }

        addFriend(data) {
            this.__list.push(new FriendModel(data));
        }

        getFriends() {
            return this.__list;
        }

        getFriendById(id) {
            console.log('ID', id);
            if (typeof id !== 'number') {
                id = Number(id);
            }
            var friends = this.__list;

            return friends.filter(friend => {
                return friend.id === id;
            })[0];
        }

        setMessage(data) {
            var friendId = data.id_friend;
            var friend = this.getFriendById(friendId);
            friend.setMessage(data);
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
            data.forEach(friend => {
                this.addFriend(friend);
            });
        }

    }

    return FriendsModel;
};