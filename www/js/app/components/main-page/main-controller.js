"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicLoading, app, friendsService, $interval) {
    $ionicLoading.show();

    $scope.authCheck.promise
        .then(app.init)
        .then(() => {
            $scope.topFriends = friendsService.friends;
            $ionicLoading.hide();
            friendsService.setDataListener();
    });

    $scope.$on('$destroy', friendsService.removeDataListener);

    $scope.refresh = function() {

    }
};