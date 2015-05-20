"use strict";

module.exports = /*@ngInject*/ function($scope, friendsService, popupService) {
    $scope.friends = friendsService.friends;
    $scope.onlineFriends = friendsService.getOnlineFriends();
    $scope.potentialFriends = friendsService.potentialFriends;
    $scope.friendsCount = $scope.friends.length;
    $scope.onlineFriendsCount = $scope.onlineFriends.length;
    $scope.potentialFriendsCount = $scope.potentialFriends.length;
    $scope.followers = friendsService.getFollowers();
    $scope.followees = friendsService.getFollowees();

    $scope.$watch('friends', () => {
        $scope.onlineFriends = friendsService.getOnlineFriends();
        $scope.friendsCount = $scope.friends.friends.length;
        $scope.onlineFriendsCount = $scope.onlineFriends.length;
    });

    $scope.$watch('potentialFriends', () => {
        $scope.potentialFriendsCount = $scope.potentialFriends.users.length;
        $scope.followers = friendsService.getFollowers();
        $scope.followees = friendsService.getFollowees();
    });

};