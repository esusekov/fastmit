"use strict";

module.exports = /*@ngInject*/ function($scope, $timeout, $location, $ionicLoading, friendsService, cameraService, $interval) {
    $ionicLoading.show();

    console.log(friendsService);
    
    
    //$scope.authCheck.promise
    //    .then(friendsService.init())
    //    .then(() => {
    //        $scope.topFriends = friendsService.friends;
    //        $ionicLoading.hide();
    //        friendsService.setDataListener();
    //});

    $timeout(() => {
        friendsService.init()
            .then(() => {
                $scope.topFriends = friendsService.friends;
                friendsService.setDataListener();
            }).finally(() => {
                $ionicLoading.hide();
            })
    }, 500);

    $scope.$on('$destroy', friendsService.removeDataListener);

    $scope.openCamera = function() {
        return cameraService.makePhoto().then(data => {
            $location.path('/app/editor');
        });
    }
};