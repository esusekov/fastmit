"use strict";

module.exports = /*@ngInject*/ function($scope, $translate, authorization, $location) {

    $scope.logout = function() {

        authorization.logout(function() {
            $location.path('/login');
            console.log(authorization.getToken());
        });



    };

};