"use strict";
//TODO - refactoring
module.exports = /*@ngInject*/ function( /*FriendModel,*/ FriendsModel, PotentialFriendsModel, UserModel, httpService, $q, $interval) {

    var friends = new FriendsModel();
    var potentialFriends = new PotentialFriendsModel();
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

        reset() {
            friends.reset();
            potentialFriends.reset();
        },

        get friends() {
            return friends;
        },

        get onlineFriends() {
            return friends.friends.filter(friend => friend.isOnline);
        },

        get potentialFriends() {
            return potentialFriends;
        },

        filterFriendsByUsername(query) {
            var lowercasedQuery = query.toLowerCase();

            return friends.filterByUsername(lowercasedQuery);
        },

        loadFriends: function() {
            return httpService.friendsList({}).then(response => {
                console.log('FriendList', response);

                let friends_ = response.data.friends || [];

                if (response.status === 200 && friends_ != null) {
                    friends.updateFriends(friends_);
                }
            });
        },

        loadPotentialFriends: function() {
            return httpService.potentialFriendsList({}).then(response => {
                console.log('PotentialFriends', response);

                let users = response.data.users || [];

                if (response.status === 200 && users != null) {
                    potentialFriends.setFriends(users);
                }
            });
        },

        setDataListener() {
            dataInterval = $interval(() => {
                this.refresh();
            }, 30000);
        },

        removeDataListener() {
            if (dataInterval) {
                $interval.cancel(dataInterval);
            }
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
            return httpService.addFriend(id).success(() => {
                return this.refresh();
            }).error(() => {
                return $q.reject();
            });
        },

        deleteFriend(id) {
            return httpService.deleteFriend(id).success(() => {
                return this.refresh();
            }).error(() => {
                return $q.reject();
            });
        },

        searchForUser(username) {
            var lowercasedUsername = username.toLowerCase();

            return $q((resolve, reject) => {
                httpService.search(lowercasedUsername).success((data) => {
                    resolve(data.users.map(user => new UserModel(user)));
                }).error(reject);
            })
        }
    };
};