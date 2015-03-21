"use strict";

module.exports = /*@ngInject*/ function($http, authorization, urls_api, friendsFactory) {
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
                token: authorization.getToken(),
                sort: sort //id, top ...
            };

            return $http.get(urls_api.friendsList, data).then(response => {
                if (response.status === 200 && response.data.friends !== undefined) {
                    topFriends = makeFriendsListFromSource(response.data.friends);
                    friends = topFriends.slice().sort(idCompare);
                }
            });
        },

        getTopFriends: function(limit) {
            return topFriends.splice(0, limit);
        }

    };
};