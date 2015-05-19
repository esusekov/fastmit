"use strict";

module.exports = /*@ngInject*/ function($scope, $translate, authorizationService, friendsService, $location) {

    $scope.logout = function() {
        authorizationService.logout().then(() => {
            friendsService.reset();
            $location.path('/login');
        });
    };

};