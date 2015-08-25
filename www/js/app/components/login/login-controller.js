"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicHistory,
    $location, LoginModel, popupService, $ionicLoading, statusResponseService) {

    $scope.model = new LoginModel();

    $scope.signIn = function() {
        $ionicLoading.show();

        $scope.model.signIn().then(() => {
            console.log('HISTORY', $ionicHistory.viewHistory());
            $scope.model.clear();
            $location.path('/app/main');
        }).catch(error => {
            var text = statusResponseService.getTextForStatus(error);
            popupService.alert(text);
        }).finally(() => {
            $ionicLoading.hide();
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