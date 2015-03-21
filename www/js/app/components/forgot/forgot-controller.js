"use strict";

module.exports = /*@ngInject*/ function($scope, $location, authorizationService, popupService) {

    $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.forgotPassword = function(email) {
        authorizationService.forgotPassword({
            email: email
        }, function() {
            popupService.alert('New password sent to your specified mailbox');
        }, function() {
            console.log('Fail');
        });
    };

};