"use strict";

module.exports = /*@ngInject*/ function($scope, $location,
    httpService, popupService,  $ionicLoading, statusResponseService) {

    $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.forgotPassword = function(email) {
        $ionicLoading.show();
        console.log('Forgot', email);

        httpService.forgotPassword({
            email: email
        }).then(() => {
            popupService.alert('Новый пароль отправлен на указанный email!');
            $location.path('/recovery');
        }).catch(error => {
            var text = statusResponseService.getTextForStatus(error);
            popupService.alert(text);
        }).finally(() => {
            $ionicLoading.hide();
        });
    };
};
