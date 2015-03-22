"use strict";

module.exports = /*@ngInject*/ function($scope, friendsService) {
    $scope.friends = friendsService.friends;
};