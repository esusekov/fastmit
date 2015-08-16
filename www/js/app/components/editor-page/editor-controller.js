"use strict";

module.exports = /*@ngInject*/ function($scope, $fabric, $window, $timeout, $location, cameraService) {

    $scope.image = cameraService.image;

    $scope.canvas = new $fabric.Canvas('c', {
        isDrawingMode: true,
        backgroundColor: '#888'
    });

    $scope.drawing = false;

    $scope.init = function() {
        $scope.canvas.setHeight($window.innerHeight);
        $scope.canvas.setWidth($window.innerWidth);
        $scope.canvas.renderAll();
        $scope.canvas.setBackgroundImage($scope.image, $scope.canvas.renderAll.bind($scope.canvas), {
            width: $scope.canvas.width,
            height: $scope.canvas.height,
            originX: 'left',
            originY: 'top'
        });

        $scope.canvas.freeDrawingBrush.color = '#fff';
        $scope.canvas.freeDrawingBrush.width = 10;

        $scope.color = '#fff';

    };

    $scope.clear = function() {
        $scope.canvas.clear();
    };

    $scope.chooseColor = function(color) {
        $scope.canvas.freeDrawingBrush.color = $scope.color = color;
    };

    $scope.chooseWidth = function(width) {
        $scope.canvas.freeDrawingBrush.width = width;
    };

    $scope.changeDrawMode = function() {
        $scope.canvas.isDrawingMode = !$scope.canvas.isDrawingMode;
    };

    $scope.addText = function() {
        $scope.canvas.add(new $fabric.IText("Text", {
            fontSize: 40,
            fill: $scope.color,
            left: 100,
            top: 100
        }));

        $scope.canvas.isDrawingMode = false;
    };

    $scope.saveImage = function() {
        $scope.canvas.deactivateAll().renderAll();
        cameraService.image = $scope.canvas.toDataURL('jpg');
        $location.path('/app/main');
    };

    $scope.canvas.on('mouse:down', function(event) {
        if (event.e.which === 1) {
            $scope.drawing = true;
        }
    });

    $scope.canvas.on('mouse:up', function(event) {
        if (event.e.which === 1) {
            $scope.drawing = false;
        }
    });

    $timeout(function() {
        $scope.init();
    }, 1000);

    console.log($fabric.isTouchSupported);
};