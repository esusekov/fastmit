"use strict";

module.exports = /*@ngInject*/ function($scope,
    $stateParams, friendsService, messagesBoxService,
    chatSenderService, cameraService, typesMessagesConstants) {

    var DEFAULT_TIMEOUT = 10 * 1000;

    var friendId = $stateParams.id;
    var friend = friendsService.getFriendById(friendId);
    var messages = messagesBoxService.getMessages(friendId);

    $scope.friend = friend;
    $scope.messages = messages;
    $scope.text = null;

    function generateMessageData(text, type) {
        return {
            isMy: true,
            text: text,
            type: type,
            timeout: DEFAULT_TIMEOUT
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

    function sendMessage(text, typeMessage) {
        var data = generateMessageData(text, typeMessage);
        console.log('Message', data);
        chatSenderService.sendMessage(friendId, data);
    }

    $scope.sendText = function() {
        var text = $scope.text;
        if (isValidTextMessage(text)) {
            sendMessage(text, typesMessagesConstants.TEXT);
            clearText();
        }
    };

    $scope.makePhoto = function() {
        cameraService.makePhoto().then(text => {
            console.log(text);
            sendMessage(text, typesMessagesConstants.PHOTO);
        });
    };

    $scope.$on('delete-message', (event, messageId) => {
        messagesBoxService.removeMessageById(friendId, messageId);
    });

    $scope.$on('resend-message', (event, messageId) => {
        chatSenderService.resendMessage(friendId, messageId);
    });
};
