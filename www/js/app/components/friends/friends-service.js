"use strict";

module.exports = /*@ngInject*/ function($http, authorizationService, urlsApi, usersFactory) {
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
                token: authorizationService.getToken()
            };

            return $http.get(urlsApi.friendsList, data).then(response => {
                if (response.status === 200 && response.data.friends !== undefined) {
                    friends = makeFriendsListFromSource(response.data.friends);
                }
            });
        }

    };
};