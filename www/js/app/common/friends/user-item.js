"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/common/friends/user-item.html',
        scope: {
            user: '='
        },
        controller: ['$scope', 'popupService', 'friendsService', 'PotentialFriendModel',
            function($scope, popupService, friendsService, PotentialFriendModel) {
            $scope.makeFriend = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                friendsService.addFriend($scope.user.id).then(function() {
                    var message = ($scope.user instanceof PotentialFriendModel  && $scope.user.isFollower()) ?
                        'Новый друг успешно добавлен!' :
                        'Запрос на добавление в друзья отправлен!';
                    popupService.alert(message);
                }).catch(function() {
                    popupService.alert('При добавлении возникла ошибка.');
                });
            };
        }]
    };
};