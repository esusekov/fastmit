"use strict";

module.exports = /*@ngInject*/ function($http, authorization, urls_api, usersFactory) {
    function makeFriendsListFromSource(sourceArray) {
        return sourceArray.map(source => usersFactory.create(source));
    }

    var friends = [];

    return {
        get friends() {
            return friends;
        },

        load: function() {
            var data = {
                token: authorization.getToken()
            };

            return $http.get(urls_api.friendsList, data).then(response => {
                if (response.status === 200 && response.data.friends !== undefined) {
                    friends = makeFriendsListFromSource(response.data.friends);
                }
            });
        }

    };
};