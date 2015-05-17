"use strict";

module.exports = /*@ngInject*/ function($scope, friendsService) {
    $scope.friends = friendsService.getFriends();
    $scope.onlineFriends = friendsService.getOnlineFriends();
    $scope.requestingFriends = friendsService.getFollowers();
    $scope.desirableFriends = friendsService.getFollowees();
    $scope.friendsCount = $scope.friends.length;
    $scope.onlineFriendsCount = $scope.onlineFriends.length;
};