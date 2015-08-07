"use strict";

module.exports = /*@ngInject*/ function(popupService, friendsService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/common/friends/friend-item.html',
        scope: {
            friend: '='
        },
        link: function(scope, element) {
            var dragging = false;

            scope.deleteFriend = function() {
                friendsService.deleteFriend(scope.friend.id).then(function() {
                    //var message = follow ? 'Запрос на добавление в друзья отправлен!' : 'Новый друг успешно добавлен!';
                    var message = 'Потрачено!';
                    popupService.alert(message);
                }).catch(function() {
                    popupService.alert('При удалении возникла ошибка.');
                });
            };

            scope.onDragLeft = function($event) {
                dragging = true;
                element[0].style.transform = `translateX(-${$event.gesture.distance}px)`;
            };

            scope.onDragEnd = function($event) {
                if (dragging) {
                    if ($event.gesture.distance > 100) {
                        scope.deleteFriend();
                    } else {
                        element[0].style.transform = `translateX(0)`;
                    }
                    dragging = false;
                }
            };
        }
    };
};