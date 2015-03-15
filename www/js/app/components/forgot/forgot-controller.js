"use strict";

module.exports = /*@ngInject*/ function($scope, $location, authorization) {

    $scope.forgotPassword = function(email) {
        authorization.forgotPassword({
            email: email
        }, function() {
            console.log('Ok');
        }, function() {
            console.log('Fail');
        });
    };

};