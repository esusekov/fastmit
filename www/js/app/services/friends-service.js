"use strict";

module.exports = /*@ngInject*/ function(FriendsModel, httpService, $q) {

    var friends = new FriendsModel();

    return {

        init() {
            console.log('init');

            return $q.all([
                this.loadFriends(),
                this.loadPotentialFriends()
            ]);
        },

        getFriends: function() {
            return friends.getFriends();
        },

        loadFriends: function() {
            return httpService.friendsList({}).then(response => {
                console.log('FriendList', response);

                var friends_ = response.data.friends;

                if (response.status === 200 && friends_ != null) {
                    friends.setFriends(friends_);
                }
            });
        },

        loadPotentialFriends: function() {
            return httpService.potentialFriendsList({}).then(response => {
                console.log('PotentialFriends', response);
            });
        },

        setMessage: function(data) {
            friends.setMessage(data);
        },

        setFriend: function(data) {
            friends.setFriend(data);
        },

        getFriendById(id) {
            return friends.getFriendById(id);
        }
    };
};