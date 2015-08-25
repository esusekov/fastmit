"use strict";

module.exports = /*@ngInject*/ function($scope, popupService,
    httpService, RecoveryModel, statusResponseService, $ionicLoading, $location) {

    $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.model = new RecoveryModel();

    $scope.reset = function() {
        $scope.model.clear();
    };

    $scope.recoverPassword = function() {
        var model = $scope.model;

        if (model.newPassword1 !== model.newPassword2) {
            popupService.alert('Пароли не совпадают!');
            $scope.reset();
            return;
        }

        $ionicLoading.show();

        httpService.recoverPassword({
            email: model.email,
            tmpPassword: model.tmpPassword,
            newPassword: model.newPassword1
        }).then(() => {
            popupService.alert('Пароль успешно изменен!');
            $location.path('/login');
            $scope.reset();
        }).catch(error => {
            var text = statusResponseService.getTextForStatus(error);
            popupService.alert(text);
        }).finally(() => {
            $ionicLoading.hide();
        });
    };

    $scope.isNotEmpty = function(value) {
        return value != null && value !== '';
    };
};