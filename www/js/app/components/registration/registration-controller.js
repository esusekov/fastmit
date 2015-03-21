"use strict";

module.exports = /*@ngInject*/ function($scope, $location, RegistrationModel, popupService) {

    $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.model = new Registration();

    $scope.register = function() {
        $scope.model.register(function() {
            $location.path('/app/main');
        }, function() {
            popup.alert('Something wrong!');
        });
    };

};
