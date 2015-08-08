"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/text.html',
        scope: {
            message: '='
        },

        link: function(scope, element, attrs) {

        }
    }
};