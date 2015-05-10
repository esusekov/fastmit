"use strict";

module.exports = /*@ngInject*/ function($scope, $q, $ionicLoading, friendsService) {
    $ionicLoading.show();

    $q.all([
        friendsService.load('top'),
        friendsService.loadPotentialFriends()
    ]).then(function() {
        $scope.topFriends = friendsService.getTopFriends(3);
        $scope.requestingFriends = friendsService.getRequesters(3);
        $ionicLoading.hide();
    });
};