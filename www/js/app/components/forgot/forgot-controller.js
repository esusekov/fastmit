"use strict";

module.exports = /*@ngInject*/ function($scope, $location,
    authorizationService, popupService,  $ionicLoading, statusResponseService) {

    $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.forgotPassword = function(email) {
        $ionicLoading.show();

        authorizationService.forgotPassword({
            email: email
        }).then(() => {
            popupService.alert('Новый пароль отправлен на указанный email!');
        }).catch(error => {
            var text = statusResponseService.getTextForStatus(error);
            popupService.alert(text);
        }).finally(() => {
            $ionicLoading.hide();
        });
    };
};
