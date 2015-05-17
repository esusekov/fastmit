"use strict";

module.exports = /*@ngInject*/ function($scope, $stateParams, app) {
    $scope.id = $stateParams.id;
    $scope.friend = app.friendsService.getFriendById($scope.id);

    $scope.message = null;

    $scope.sendMessage = function() {
        
        var message = $scope.message.trim();
                   console.log('Message', message);
                   
        if (message != null && message != '') {
            $scope.friend.sendMessage({
                isMy: true,
                message: message,
                type: 'text'
            });
        }
        $scope.clearMessage();
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