"use strict";

module.exports = /*@ngInject*/ function($scope, $stateParams, friendsService) {
    $scope.id = $stateParams.id;
    $scope.friend = friendsService.getFriendById($scope.id);

    $scope.message = null;

    $scope.sendMsg = function() {
        if ($scope.message != null) {
            $scope.friend.sendMessage({
                isMy: true,
                text: $scope.message
            });
            $scope.clearMsg();
        }
    };

    $scope.clearMsg = function() {
        $scope.message = null;
    };

};