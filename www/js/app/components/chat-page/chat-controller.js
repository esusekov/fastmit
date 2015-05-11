"use strict";

module.exports = /*@ngInject*/ function($scope, $stateParams, app) {
    $scope.id = $stateParams.id;
    $scope.friend = app.friendsService.getFriendById($scope.id);

    $scope.message = null;

    $scope.sendMessage = function() {

        console.log('Friend', $scope.friend);
        
        if ($scope.message != null) {
            $scope.friend.sendMessage({
                isMy: true,
                message: $scope.message,
                type: 'text'
            });
            $scope.clearMessage();
        }
    };

    $scope.clearMessage = function() {
        $scope.message = null;
    };

    $scope.$on('delete-message', (event, id) => {
        $scope.friend.deleteMessage(id);
    });

};