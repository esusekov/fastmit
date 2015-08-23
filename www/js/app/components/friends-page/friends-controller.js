"use strict";

module.exports = /*@ngInject*/ function($scope, friendsService, popupService) {
    $scope.friends = friendsService.friends;
    $scope.onlineFriends = friendsService.onlineFriends;
    $scope.potentialFriends = friendsService.potentialFriends;
    $scope.onlineFriendsCount = $scope.onlineFriends.length;
    $scope.potentialFriendsCount = $scope.potentialFriends.length;
};