"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicLoading, friendsService, cameraService, $interval) {
    $ionicLoading.show();

    console.log(friendsService);
    
    
    $scope.authCheck.promise
        .then(friendsService.init())
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