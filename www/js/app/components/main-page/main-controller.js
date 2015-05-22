"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicLoading, app, friendsService, cameraService, $interval) {
    $ionicLoading.show();

    $scope.authCheck.promise
        .then(app.init)
        .then(() => {
            $scope.topFriends = friendsService.friends;
            $ionicLoading.hide();
            friendsService.setDataListener();
    });

    $scope.$on('$destroy', friendsService.removeDataListener);

    $scope.openCamera = function() {
        return cameraService.makePhoto().then(data => {
            //some action
        });
    }
};