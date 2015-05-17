"use strict";
//TODO - refactoring
module.exports = /*@ngInject*/ function(FriendsModel, PotentialFriendModel, httpService, $q) {

    var friends = new FriendsModel();
    var potentialFriends = [];

    return {

        init() {
            console.log('init');

            return $q.all([
                this.loadFriends(),
                this.loadPotentialFriends()
            ]);
        },

        refresh() {
            return $q.all([
                this.loadFriends(),
                this.loadPotentialFriends()
            ]);
        },

        getFriends: function() {
            return friends.getFriends();
        },

        getOnlineFriends() {
            return friends.getFriends().filter(friend => friend.isOnline);
        },

        getPotentialFriends() {
            return friends.getFriends().filter(friend => friend.isOnline);
        },

        getFollowers() {
            return potentialFriends.filter(user => user.isFollower());
        },

        getFollowees() {
            return potentialFriends.filter(user => user.isFollowee());
        },

        loadFriends: function() {
            return httpService.friendsList({}).then(response => {
                console.log('FriendList', response);

                let friends_ = response.data.friends || [];

                if (response.status === 200 && friends_ != null) {
                    friends.refreshFriends(friends_);
                }
            });
        },

        loadPotentialFriends: function() {
            return httpService.potentialFriendsList({}).then(response => {
                console.log('PotentialFriends', response);

                let users = response.data.users || [];

                if (response.status === 200 && users != null) {
                    potentialFriends = users.map(user => new PotentialFriendModel(user));
                }
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