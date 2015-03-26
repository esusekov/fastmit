"use strict";

module.exports = /*@ngInject*/ function($scope, $stateParams, friendsService) {
    $scope.id = $stateParams.id;
    $scope.friend = friendsService.getFriendById($scope.id);
};