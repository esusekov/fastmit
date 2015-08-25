"use strict";

module.exports = /*@ngInject*/ function($scope, $location,
    RegistrationModel, popupService, $ionicHistory, $ionicLoading, statusResponseService) {

    $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.model = new RegistrationModel();

    $scope.register = function() {
        $ionicLoading.show();

        $scope.model.register().then(() => {
            $location.path('/app/main');
        }).catch(error => {
            var text = statusResponseService.getTextForStatus(error);
            popupService.alert(text);
        }).finally(() => {
            $ionicLoading.hide();
        });
    };

    $scope.goBack = function() {
        $scope.model.clear();
        $ionicHistory.goBack();
    };
};
