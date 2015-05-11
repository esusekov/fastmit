"use strict";

module.exports = /*@ngInject*/ function() {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/chat/templates/text.html',
        scope: {
            message: '='
        },
        controller: function($scope, $element, $attrs) {

        },
        link: function(scope, element, attrs) {

        }
    }

};