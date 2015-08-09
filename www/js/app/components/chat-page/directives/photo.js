"use strict";

module.exports = /*@ngInject*/ function($document, $timeout, $ionicModal) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/photo.html',
        scope: {
            photoData: '=',
            messageId: '=',
            timeout: '='
        },
        link: function(scope, element, attrs) {

            $ionicModal.fromTemplateUrl('js/app/components/chat-page/templates/photo-img.html', {
                scope: scope,
                animation: 'fade-in'
            }).then(modal => {
                scope.modal = modal;
            });

            function showModal() {
                scope.modal.show();
            }

            function hideModal() {
                scope.modal.hide();
            }

            function mousedown() {
                $document.on('touchend', mouseup);
                scope.timeout.start();

                showModal();
                console.log('mouseDown');
            }

            function mouseup() {
                $document.off('touchend', mouseup);

                hideModal();
                console.log('mouseUp');
            }

            scope.timeout.onFinish(() => {
                hideModal();
            });

            element.on('touchstart',mousedown);
        }
    }
};
