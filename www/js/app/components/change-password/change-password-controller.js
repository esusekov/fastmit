"use strict";

module.exports = /*@ngInject*/ function($scope, popupService, httpService, ChangePasswordModel) {

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

        httpService.changePassword($scope.model.oldPassword, $scope.model.newPassword1)
            .then(() => {
                popupService.alert('Пароль успешно изменен');
                $scope.reset();
            })
            .catch((e) => {
                console.log('Changepass error', e);

                popupService.alert(e.data.response);
                $scope.reset();
            });
    };

    $scope.isNotEmpty = function(value) {
        return value != null && value !== '';
    };

};