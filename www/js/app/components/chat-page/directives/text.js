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
            var messageId = scope.message.id;

            scope.resend = function() {
                popupService.confirm('Попробывать снова?')
                    .then(() => {
                        console.log('resend');
                        
                        scope.$emit('resend-message', messageId);
                    })
                    .catch(() => {
                        console.log('not resend');
                        
                        scope.$emit('delete-message', messageId);
                    });
            };
        }
    }
};