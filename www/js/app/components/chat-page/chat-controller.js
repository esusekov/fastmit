"use strict";

module.exports = /*@ngInject*/ function($scope,
    $stateParams, friendsService, messagesBoxService,
    chatService, cameraService, typesMessagesConstants,
    globalConstants, $ionicScrollDelegate) {

    var friendId = $stateParams.id;
    var friend = friendsService.getFriendById(friendId);
    var messages = messagesBoxService.getMessages(friendId);

    $scope.friend = friend;
    $scope.messages = messages;
    $scope.text = null;

    $scope.$watchCollection('messages', event => {
        $ionicScrollDelegate.scrollBottom();
    });

    function generateTextMessage(text) {
        return {
            isMy: true,
            text: text,
            type: typesMessagesConstants.TEXT
        };
    }

    function generatePhotoMessage(photoData) {
        return {
            isMy: true,
            photoData: photoData,
            type: typesMessagesConstants.PHOTO,
            timeout: globalConstants.DEFAULT_TIMEOUT
        };
    }

    function isValidTextMessage(text) {
        if (text != null) {
            text = text.trim();

            if (text != null && text != '') {
                return true;
            }
        }
        return false;
    }

    function clearText() {
        $scope.text = null;
    }

    function sendMessage(message) {
        chatService.sendMessage(friendId, message);
    }

    $scope.sendText = function() {
        var text = $scope.text;
        if (isValidTextMessage(text)) {
            var message = generateTextMessage(text);
            sendMessage(message);
            clearText();
        }
    };

    $scope.makePhoto = function() {
        cameraService.makePhoto().then(photoData => {
            var message = generatePhotoMessage(photoData);
            sendMessage(message);
        });
    };

    $scope.$on('delete-message', (event, messageId) => {
        messagesBoxService.removeMessageById(friendId, messageId);
    });

    $scope.$on('resend-message', (event, messageId) => {
        chatService.resendMessage(friendId, messageId);
    });
};
