"use strict";

module.exports = function($window) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/editor-page/color-picker.html',
        scope: {
            chooseColor: '&',
            chooseWidth: '&'
        },
        link: function(scope, element) {
            scope.colors = [
                {
                    value: '#f00'
                },
                {
                    value: 'blue'
                },
                {
                    value: 'yellow'
                },
                {
                    value: 'green'
                },
                {
                    value: 'black'
                },
                {
                    value: 'white'
                }
            ];

            scope.choose = function(color) {
                scope.chooseColor({color: color.value});
            };

            scope.handlePickerClick = function() {
                console.log(element[0].clientWidth);
            };

            scope.resizeHandler = function() {
                scope.chooseWidth({width: element[0].clientWidth / 2});
            };

            $window.addResizeListener(element[0],scope.resizeHandler);
        }
    }
};