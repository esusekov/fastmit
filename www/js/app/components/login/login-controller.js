"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicHistory, $location, LoginModel, popupService) {

    $scope.model = new LoginModel();

    $scope.signIn = function() {
        $scope.model.signIn().then(() => {
            console.log('HISTORY', $ionicHistory.viewHistory());
            $scope.model.clear();
            $location.path('/app/main');
        }).catch(() => {
            popupService.alert('Неправильно введен логин или пароль');
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

    $scope.$on("$ionicView.enter", function(){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
    });

};