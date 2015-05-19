"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/common/friends/user-item.html',
        scope: {
            user: '=',
            addFriend: '&'
        },
        controller: ['$scope', 'popupService', 'friendsService', function($scope, popupService, friendsService) {
            $scope.makeFriend = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                friendsService.addFriend($scope.user.id).then(function() {
                    //var message = follow ? 'Запрос на добавление в друзья отправлен!' : 'Новый друг успешно добавлен!';
                    var message = 'Новый друг успешно добавлен!';
                    popupService.alert(message);
                }).catch(function() {
                    popupService.alert('При добавлении возникла ошибка.');
                });
            };
        }]
    };
};