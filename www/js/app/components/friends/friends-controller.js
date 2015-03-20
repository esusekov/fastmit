"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicLoading, friendsService) {

    $ionicLoading.show();

    friendsService.load().then(() => {
        $scope.friends = friendsService.friends;
        $ionicLoading.hide();
    });
};