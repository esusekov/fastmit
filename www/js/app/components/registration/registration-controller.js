"use strict";

module.exports = /*@ngInject*/ function($scope, $location, authorization) {

    $scope.username = $scope.email = $scope.password = '';

    $scope.register = function(username, email, password) {
        console.log($scope.username);
        authorization.register({
            username: username,
            email: email,
            password: password
        }, function() {
            $location.path('/app/main');
        }, function() {
            console.log('Error registration');
        });
    };

};
