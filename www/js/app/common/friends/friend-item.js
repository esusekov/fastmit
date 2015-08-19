"use strict";

module.exports = /*@ngInject*/ function(popupService, friendsService, $ionicListDelegate) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/common/friends/friend-item.html',
        scope: {
            friend: '=',
            noOptions: '='
        },
        link: function(scope, element) {

            scope.deleteFriend = function() {
                friendsService.deleteFriend(scope.friend.id).then(function() {
                    //var message = follow ? 'Запрос на добавление в друзья отправлен!' : 'Новый друг успешно добавлен!';
                    var message = 'Потрачено!';
                    $ionicListDelegate.$getByHandle('friends').closeOptionButtons();
                    popupService.alert(scope.friend.username + ' удален из ваших друзей');
                }).catch(function() {
                    popupService.alert('При удалении возникла ошибка.');
                });
            };

        }
    };
};