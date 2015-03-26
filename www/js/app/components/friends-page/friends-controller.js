"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicLoading, friendsService) {
    $scope.friends = friendsService.friends;
    $scope.onlineFriends = friendsService.onlineFriends;
    $scope.friendsCount = $scope.friends.length;
    $scope.onlineFriendsCount = $scope.onlineFriends.length;
};