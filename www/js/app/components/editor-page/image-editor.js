"use strict";

module.exports = function($fabric, $window, $timeout, $location, cameraService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/editor-page/editor.html',
        scope: {
            close: '&'
        },
        link: function(scope, element) {
            scope.image = cameraService.image;

            scope.canvas = new $fabric.Canvas('c', {
                isDrawingMode: false,
                backgroundColor: '#888'
            });

            scope.init = function() {
                scope.canvas.setHeight($window.innerHeight);
                scope.canvas.setWidth($window.innerWidth);
                scope.canvas.renderAll();
                scope.canvas.setBackgroundImage(scope.image, scope.canvas.renderAll.bind(scope.canvas), {
                    width: scope.canvas.width,
                    height: scope.canvas.height,
                    originX: 'left',
                    originY: 'top'
                });

                scope.canvas.freeDrawingBrush.color = '#fff';
                scope.canvas.freeDrawingBrush.width = 10;

                scope.color = '#fff';

            };

            scope.clear = function() {
                scope.canvas.clear();
            };

            scope.chooseColor = function(color) {
                scope.canvas.freeDrawingBrush.color = scope.color = color;
            };

            scope.chooseWidth = function(width) {
                scope.canvas.freeDrawingBrush.width = width;
            };

            scope.changeDrawMode = function() {
                scope.canvas.isDrawingMode = !scope.canvas.isDrawingMode;
            };

            scope.addText = function() {
                scope.canvas.add(new $fabric.IText("Text", {
                    fontSize: 30,
                    fill: 'white',
                    left: 100,
                    top: 100
                }));

                scope.canvas.isDrawingMode = false;
            };

            scope.saveImage = function() {
                scope.canvas.deactivateAll().renderAll();
                cameraService.image = scope.canvas.toDataURL('jpg');
                scope.close({success: true});
            };

            scope.cancel = function() {
                cameraService.image = null;
                scope.close({success: false});
            };

            scope.canvas.on('mouse:down', (event) => {
                if (event.e.which <= 1) {
                    element.addClass('drawing');
                }
            });

            scope.canvas.on('mouse:up', (event) => {
                if (event.e.which <= 1) {
                    element.removeClass('drawing');
                }
            });

            $timeout(function() {
                scope.init();
            }, 1000);
        }
    }
};