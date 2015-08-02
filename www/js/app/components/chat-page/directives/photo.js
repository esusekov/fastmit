"use strict";

module.exports = /*@ngInject*/ function($document, $timeout, $ionicModal) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/photo.html',
        scope: {
            text: '=',
            messageId: '=',
            timeout: '='
        },
        link: function(scope, element, attrs) {
            var flagTick = true;
            var TICK = 1000;

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

            function timeoutTick() {
                if (scope.timeout === 0) {
                    scope.$emit('delete-message', scope.messageId);
                    hideModal();

                    $document.off('mouseup', mouseup);
                    element.off('mousedown', mousedown);
                    $document.off('touchend', mouseup);
                    element.off('touchstart', mousedown);

                } else {
                    scope.timeout -= TICK;
                    $timeout(timeoutTick, TICK);
                }
            }

            function mousedown() {
                scope.$apply(() => {
                    showModal();
                    $document.on('mouseup', mouseup);
                    $document.on('touchend', mouseup);

                    if (flagTick) {
                        flagTick = false;
                        $timeout(timeoutTick, TICK);
                    }
                });
            }

            function mouseup() {
                scope.$apply(() => {
                    hideModal();
                    $document.off('mouseup', mouseup);
                    $document.off('touchend', mouseup);
                });
            }

            element.on('mousedown', mousedown);
            element.on('touchstart', mousedown);
        }
    }
};
