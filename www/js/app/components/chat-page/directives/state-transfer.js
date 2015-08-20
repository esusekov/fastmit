"use strict";

module.exports = /*@ngInject*/ function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/state-transfer.html',
        scope: {
            state: '=',
            messageId: '='
        },
        link: function(scope, element, attrs) {

        }
    }
};
