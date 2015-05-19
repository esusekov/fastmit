"use strict";
//TODO - refactoring
module.exports = /*@ngInject*/ function(FriendsModel, PotentialFriendModel, httpService, $q, $interval) {

    var friends = new FriendsModel();
    var potentialFriends = [];
    var dataInterval;

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

        getFriends() {
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

        loadFriends() {
            return httpService.friendsList({}).then(response => {
                console.log('FriendList', response);

                let friends_ = response.data.friends || [];

                if (response.status === 200 && friends_ != null) {
                    friends.updateFriends(friends_);
                }
            });
        },

        loadPotentialFriends() {
            return httpService.potentialFriendsList({}).then(response => {
                console.log('PotentialFriends', response);

                let users = response.data.users || [];

                if (response.status === 200 && users != null) {
                    potentialFriends = users.map(user => new PotentialFriendModel(user));
                }
            });
        },

        setDataListener() {
            dataInterval = $interval(() => {
                this.refresh();
            }, 30000);
        },

        removeDataListener() {
            $interval.cancel(dataInterval);
        },

        setMessage(data) {
            friends.setMessage(data);
        },

        setFriend(data) {
            friends.setFriend(data);
        },

        getFriendById(id) {
            return friends.getFriendById(id);
        },

        addFriend(id) {
            return httpService.addFriend(id).success(function() {
                return this.refresh();
            }).error(function() {
                return $q.reject();
            });
        },

        deleteFriend(id) {
            return httpService.deleteFriend(id);
        }
    };
};