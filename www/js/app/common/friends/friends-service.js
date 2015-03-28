"use strict";

module.exports = /*@ngInject*/ function($http, authorizationService, urlsApi, friendsFactory) {
    function makeFriendsListFromSource(sourceArray) {
        return sourceArray.map(source => friendsFactory.create(source));
    }

    function idCompare(a, b) {
        return a.id < b.id ? -1 : 1;
    }

    var friends = [];
    var topFriends = [];

    return {
        get friends() {
            return friends;
        },

        get topFriends() {
            return topFriends;
        },

        get onlineFriends() {
            return friends.filter(item => item.isOnline === true);
        },

        load: function(sort) {
            var data = {
                token: authorizationService.getToken(),
                sort: sort //id, top ...
            };

            return $http.get(urlsApi.friendsList, data).then(response => {
                if (response.status === 200 && response.data.friends !== undefined) {
                    topFriends = makeFriendsListFromSource(response.data.friends);
                    friends = topFriends.slice().sort(idCompare);
                }
            });
        },

        getTopFriends: function(limit) {
            return topFriends.splice(0, limit);
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