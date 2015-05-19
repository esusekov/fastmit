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

    $scope.$watchCollection('friends', () => {
        console.log('friends updated', $scope.friends);
        $scope.onlineFriends = friendsService.getOnlineFriends();
        $scope.friendsCount = $scope.friends.length;
        $scope.onlineFriendsCount = $scope.onlineFriends.length;
        console.log($scope.onlineFriends, $scope.friendsCount, $scope.onlineFriendsCount);
    });

    $scope.$watchCollection('potentialFriends', () => {
        console.log('potential friends updated', $scope.potentialFriends);
        $scope.followers = friendsService.getFollowers();
        $scope.followees = friendsService.getFollowees();
        $scope.potentialFriendsCount = $scope.potentialFriends.length;
        console.log($scope.followers, $scope.followees, $scope.potentialFriendsCount);
    });

};