"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/common/friends/friend-item.html',
        scope: {
            friend: '='
        },
        controller: ['$scope', 'popupService', 'friendsService', function($scope, popupService, friendsService) {
            $scope.deleteFriend = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                friendsService.deleteFriend($scope.friend.id).then(function() {
                    //var message = follow ? 'Запрос на добавление в друзья отправлен!' : 'Новый друг успешно добавлен!';
                    var message = 'Потрачено!';
                    popupService.alert(message);
                }).catch(function() {
                    popupService.alert('При удалении возникла ошибка.');
                });
            };
        }]
    };
};