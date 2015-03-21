"use strict";

module.exports = /*@ngInject*/ function($scope, $translate, authorizationService, $location) {

    $scope.logout = function() {
        authorizationService.logout(function() {
            $location.path('/login');
        });
    };

};