"use strict";

module.exports = /*@ngInject*/ function(popupService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/state-transfer.html',
        scope: {
            state: '=',
            messageId: '='
        },
        link: function(scope, element, attrs) {
            var messageId = scope.messageId;

            scope.resendMessage = function() {
                popupService.confirm('Попытаться отправить еще раз?')
                    .then(() => {
                        scope.$emit('resend-message', messageId);
                    })
                    .catch(() => {
                        scope.$emit('remove-message', messageId);
                    });
            };
        }
    }
};
