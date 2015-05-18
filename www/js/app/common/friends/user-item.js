"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/common/friends/user-item.html',
        scope: {
            user: '=',
            addFriend: '&'
        },
        link: function(scope, element) {
            scope.makeFriend = function() {
                scope.addFriend({id: scope.user.id});
            };
        }
    };
};