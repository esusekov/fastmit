"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/common/friends/friend-item.html',
        scope: {
            friend: '='
        },
        link: function(scope, element) {

        }
    };
};