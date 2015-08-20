"use strict";

module.exports = /*@ngInject*/ function(popupService) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/message-text.html',
        scope: {
            message: '='
        },
        link: function(scope, element, attrs) {
            var message = scope.message;

            if (message.isMy) {
                var messageId = message.messageId;
                var stateTransfer = message.stateTransfer;

                element.on('touchstart', () => {
                    if (stateTransfer.isNotTransferred) {
                        popupService.confirm('Попробывать отправить еще раз?')
                            .then(() => {
                                scope.$emit('resend-message', messageId);
                            })
                            .catch(() => {
                                scope.$emit('remove-message', messageId);
                            });
                    }
                });
            }
        }
    }
};