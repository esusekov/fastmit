"use strict";

module.exports = /*@ngInject*/ function($scope, $location, RegistrationModel, popupService, $ionicHistory) {

    $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.model = new RegistrationModel();

    $scope.register = function() {
        $scope.model.register().then(() => {
            $location.path('/app/main');
        }).catch(() => {
            popupService.alert('Something wrong!');
        });
    };

    $scope.goBack = function() {
        $scope.model.clear();
        $ionicHistory.goBack();
    };

};
