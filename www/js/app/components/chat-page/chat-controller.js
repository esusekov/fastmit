"use strict";

module.exports = /*@ngInject*/ function($scope, $stateParams, friendsService) {
    $scope.id = $stateParams.id;

    var friend = friendsService.getFriendById($scope.id);

    console.log('Friend', friend);

    $scope.friend = friend;

    $scope.message = null;

    $scope.sendMessage = function() {
        
        var message = $scope.message.trim();
                   
        if (message != null && message != '') {
            $scope.friend.sendMessage({
                isMy: true,
                message: message,
                type_message: 'text'
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