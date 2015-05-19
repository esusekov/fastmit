"use strict";

module.exports = /*@ngInject*/ function($scope, friendsService, popupService) {
    $scope.friends = friendsService.getFriends();
    $scope.onlineFriends = friendsService.getOnlineFriends();
    $scope.requestingFriends = friendsService.getFollowers();
    $scope.desirableFriends = friendsService.getFollowees();
    $scope.friendsCount = $scope.friends.length;
    $scope.onlineFriendsCount = $scope.onlineFriends.length;

    $scope.addFriend = function(id, follow) {
        friendsService.addFriend(id).then(function() {
            var message = follow ? 'Запрос на добавление в друзья отправлен!' : 'Новый друг успешно добавлен!';
            popupService.alert(message);
        }).catch(function() {
            popupService.alert('При добавлении возникла ошибка.');
        });
    };

    $scope.deleteFriend = function(id) {
        friendsService.deleteFriend(id);
    };
};