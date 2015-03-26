"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicLoading, friendsService) {
    $ionicLoading.show();

    friendsService.load('top').then(() => {
        $scope.topFriends = friendsService.getTopFriends(3);
        $ionicLoading.hide();
    });
};