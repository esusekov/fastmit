"use strict";

module.exports = /*@ngInject*/ function($scope, $location, Login, popup) {

    $scope.model = new Login();

    $scope.signIn = function() {
        $scope.model.signIn(function() {
            $location.path('/app/main');
        }, function() {
            popup.alert('Something wrong!');
        });
    };

    $scope.goRegistration = function() {
        $location.path('/registration');
    };

    $scope.goForgotPassword = function() {
        $location.path('/forgot');
    };

};