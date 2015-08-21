"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicHistory, $location, LoginModel, popupService) {

    $scope.model = new LoginModel();

    $scope.signIn = function() {
        $scope.model.signIn().then(() => {
            $ionicHistory.clearCache();
            $scope.model.clear();
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