"use strict";

module.exports = /*@ngInject*/ function ($scope, $translate, authorizationService, friendsService, $location, $ionicHistory) {

    $scope.logout = function () {
        authorizationService.logout();
        console.log('in logout then');
        friendsService.reset();
        friendsService.removeDataListener();
        $location.path('/login');
    };
};
