"use strict";

module.exports = /*@ngInject*/ function($scope, $timeout, $location, $ionicLoading, $ionicSideMenuDelegate, $ionicNavBarDelegate, friendsService, cameraService, $interval) {
    $ionicLoading.show();

    console.log(friendsService);

    $scope.editMode = false;

    $scope.editModeOn = function() {
        $scope.editMode = true;
        $ionicSideMenuDelegate.canDragContent(false);
        $ionicNavBarDelegate.showBar(false);
    };

    $scope.editModeOff = function() {
        $scope.editMode = false;
        $ionicSideMenuDelegate.canDragContent(true);
        $ionicNavBarDelegate.showBar(true);
    };

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
        $scope.editModeOn();
        //return cameraService.makePhoto().then(data => {
        //    $scope.editModeOn();
        //});
    }
};