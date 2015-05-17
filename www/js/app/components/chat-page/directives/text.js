"use strict";

module.exports = /*@ngInject*/ function(popupService) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/text.html',
        scope: {
            message: '='
        },
        controller: function($scope, $element, $attrs) {

        },
        link: function(scope, element, attrs) {

            var id = scope.message.id;

            scope.resend = function() {
                popupService.confirm('Попробывать снова?')
                    .then(() => {
                        console.log('resend');
                        
                        scope.$emit('resend-message', id);
                    })
                    .catch(() => {
                        console.log('not resend');
                        
                        scope.$emit('delete-message', id);
                    });
            };
        }
    }

};