"use strict";

module.exports = /*@ngInject*/ function($scope, $location, LoginModel, popupService) {

    $scope.model = new LoginModel();

    $scope.signIn = function() {
        $scope.model.signIn().then(() => {
            $location.path('/app/main');
        }).catch(() => {
            popupService.alert('Something wrong!');
        });
    };

    $scope.goRegistration = function() {
        $scope.model.clear();
        $location.path('/registration');
    };

    $scope.goForgotPassword = function() {
        $scope.model.clear();
        $location.path('/forgot');
    };

};