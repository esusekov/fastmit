"use strict";

module.exports = /*@ngInject*/ function(popupService) {
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