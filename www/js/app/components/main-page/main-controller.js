"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicLoading, app) {
    $ionicLoading.show();

    app.init().then(() => {
        $scope.topFriends = app.friendsService.getFriends();
        $ionicLoading.hide();
    });
};