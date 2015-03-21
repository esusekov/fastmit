"use strict";

module.exports = /*@ngInject*/ function($scope, $location, authorization, popup) {

    $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.forgotPassword = function(email) {
        authorization.forgotPassword({
            email: email
        }, function() {
            popup.alert('New password sent to your specified mailbox');
        }, function() {
            console.log('Fail');
        });
    };

};