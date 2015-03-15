"use strict";

module.exports = /*@ngInject*/ function($scope, friendsService) {

    friendsService.load().then(() => {
        $scope.friends = friendsService.friends;
    });
};