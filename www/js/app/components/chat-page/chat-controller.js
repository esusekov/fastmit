"use strict";

module.exports = /*@ngInject*/ function($scope, $stateParams, friendsService, cameraService) {
    $scope.id = $stateParams.id;
    
    console.log('chat friends', friendsService.friends);
    
    var friend = friendsService.getFriendById($scope.id);

    console.log('Friend', friend);

    $scope.friend = friend;

    $scope.message = null;

    function sendMessage(message, type) {
        $scope.friend.sendMessage({
            isMy: true,
            message: message,
            type_message: type,
            timeout: 10 * 1000
        });
    }

    $scope.sendText = function() {
        if ($scope.message == null) {
            return;
        }

        var message = $scope.message.trim();
                   
        if (message != null && message != '') {
            sendMessage(message, 'text');
        }
        $scope.clearMessage();
    };

    $scope.sendPhoto = function() {
        cameraService.makePhoto().then(data => {
            var message = 'data:image/jpeg;base64,' + data;

            sendMessage(message, 'photo');
        });
    };

    $scope.clearMessage = function() {
        $scope.message = null;
    };

    $scope.$on('delete-message', (event, id) => {
        $scope.friend.deleteMessage(id);
    });

    $scope.$on('resend-message', (event, id) => {
        $scope.friend.resend(id);
    });

};