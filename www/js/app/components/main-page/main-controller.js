"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicLoading, app, friendsService, $interval) {
    $ionicLoading.show();

    $scope.authCheck.promise
        .then(app.init)
        .then(() => {
        $scope.topFriends = friendsService.getFriends();
        $ionicLoading.hide();
    });

    $interval(() => {
        friendsService.loadFriends().then(() => {
            console.log('loadFriends');
            $scope.topFriends = friendsService.getFriends();
        })
    }, 10000)
};