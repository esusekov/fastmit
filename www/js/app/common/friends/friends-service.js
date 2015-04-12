"use strict";

module.exports = /*@ngInject*/ function(httpService, friendsFactory) {
    function makeFriendsListFromSource(sourceArray, type) {
        return sourceArray.map(source => friendsFactory.create(source, type));
    }

    function idCompare(a, b) {
        return a.id < b.id ? -1 : 1;
    }

    var friends = [];
    var topFriends = [];
    var potentialFriends = [];

    return {
        get friends() {
            return friends;
        },

        get topFriends() {
            return topFriends;
        },

        get onlineFriends() {
            return friends.filter(friend => friend.isOnline === true);
        },

        get potentialFriends() {
            return topFriends;
        },

        load: function(sort) {
            var data = {
                sort: sort //id, top ...
            };

            return httpService.friendsList(data).then(response => {
                if (response.status === 200 && response.data.friends !== undefined) {
                    topFriends = makeFriendsListFromSource(response.data.friends, 'friend');
                    friends = topFriends.slice().sort(idCompare);
                }
            });
        },

        loadPotentialFriends: function() {
            var data = {

            };

            return httpService.potentialFriendsList(data).then(response => {
                if (response.status === 200 && response.data.users !== undefined) {
                    potentialFriends = makeFriendsListFromSource(response.data.users, 'potential');
                    console.log(potentialFriends);
                }
            });
        },

        getTopFriends: function(limit) {
            return topFriends.splice(0, limit);
        },

        getRequesters: function(limit) {
            var requesters = potentialFriends.filter(user => user.in === true);
            return limit ? requesters.splice(0, limit) : requesters;
        },

        getDesirables: function(limit) {
            var desirables = potentialFriends.filter(user => user.out === true);
            return limit ? desirables.splice(0, limit) : desirables;
        },

        getFriendById: function(id) {
            var index = friends.findIndex(friend => friend.checkId(id) );
            return index !== -1 ? friends[index] : null;
        },

        //filterFriendsByUsername: function(username) {
        //    return friends.filter(function(friend) {
        //        return friend.username.indexOf(username) !== -1;
        //    });
        //}

    };
};