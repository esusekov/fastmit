"use strict";

module.exports = /*@ngInject*/ function($scope, popupService,
    httpService, ChangePasswordModel, statusResponseService, $ionicLoading) {

    $scope.model = new ChangePasswordModel();

    $scope.reset = function() {
        $scope.model.clear();
        $scope.passwordForm.$setPristine();
        $scope.passwordForm.$setUntouched();
    };

    $scope.changePassword = function() {
        if ($scope.model.newPassword1 !== $scope.model.newPassword2) {
            popupService.alert('Пароли не совпадают!');
            $scope.reset();
            return;
        }

        $ionicLoading.show();

        httpService.changePassword($scope.model.oldPassword, $scope.model.newPassword1)
            .then(() => {
                popupService.alert('Пароль успешно изменен!');
                $scope.reset();
            })
            .catch(error => {
                var text = statusResponseService.getTextForStatus(error);
                popupService.alert(text);
                $scope.reset();
            }).finally(() => {
                $ionicLoading.hide();
            });
    };

    $scope.isNotEmpty = function(value) {
        return value != null && value !== '';
    };
};