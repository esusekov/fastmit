"use strict";

module.exports = /*@ngInject*/ function($scope, cameraService) {

    $scope.image = cameraService.image;
};