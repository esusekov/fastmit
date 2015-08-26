"use strict";

module.exports = /*@ngInject*/ function($rootScope,
    $ionicPlatform, $cordovaLocalNotification, $cordovaVibration,
    systemEventsService, $location, friendsService, settingsService) {

    var stateNotification = false;

    systemEventsService.onPause(() => {
        stateNotification = true;
    });

    systemEventsService.onResume(() => {
        stateNotification = false;
    });

    function add(data) {
        if (stateNotification && settingsService.notification) {
            return $cordovaLocalNotification.add(data);
        }
    }

    $rootScope.$on('$cordovaLocalNotification:click', (event, notification, state) => {
        console.log('ON click notification', arguments);
        
        if (state === 'background') {
            var type = notification.data.type;

            switch (type) {
                case 'message':
                    $location.path('/app/chat/' + notification.id);
                    break;

                case 'friend':
                    $location.path('/app/friends');
                    break;
            }    
        }
    });

    var messagesNotification = {
        NEW_MESSAGE: 'У вас новое сообщение от ',
        NEW_FRIEND: ' добавил вас в друзья'
    };

    return {
        notifyNewMessage(friendId) {
            var friend = friendsService.getFriendById(friendId);

            return add({
                id: friendId,
                title: 'Fastmit',
                message: messagesNotification.NEW_MESSAGE + friend.username,
                data: {
                    type: 'message'
                }
            });
        },

        notifyNewFriend(friendName) {
            return add({
                id: Date.now(),
                title: 'Fastmit',
                message: friendName + messagesNotification.NEW_FRIEND,
                data: {
                    type: 'friend'
                }
            });
        },

        vibrate() {
            var DURATION_VIBRATION = 100; //ms

            if (settingsService.vibration) {
                $cordovaVibration.vibrate(DURATION_VIBRATION);
            }
        }
    };
};
