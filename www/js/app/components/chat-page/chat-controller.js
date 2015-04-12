"use strict";

module.exports = /*@ngInject*/ function($scope, $stateParams, friendsService) {
    $scope.id = $stateParams.id;
    $scope.friend = friendsService.getFriendById($scope.id);

    $scope.correspondence = $scope.friend.correspondence;

    $scope.message = null;

    $scope.sendMessage = function() {
        if ($scope.message != null) {
            $scope.correspondence.setMyMessage({
                text: $scope.message
            });
        }
    };

};