"use strict";

module.exports = /*@ngInject*/ function(popupService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/message.html',
        scope: {
            message: '='
        },
        link: function(scope, element, attrs) {

        }
    }
};