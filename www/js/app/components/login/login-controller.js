"use strict";

module.exports = /*@ngInject*/ function($scope, $location, authorization) {

    $scope.login = function(username, password) {
        console.log($scope.username, $scope.password);
        if (username != null && password != null) {
            authorization.login({
                username: username,
                password: password
            }, function() {
                $location.path('/app/main');
            }, function() {
                console.log('Error: login fail');
            });
        }
    };

    $scope.goRegistration = function() {
        $location.path('/registration');
    };

    $scope.goForgotPassword = function() {
        $location.path('/forgot');
    };

};