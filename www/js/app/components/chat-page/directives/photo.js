"use strict";

module.exports = /*@ngInject*/ function($document, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/photo.html',
        scope: {
            message: '='
        },

        link: function(scope, element, attrs) {
            var flagTick = true;
            var isMy = scope.message.isMy;
            var id = scope.message.id;
            var tick = 1000;

            scope.show = false;

            if (isMy) {
                return;
            }
            console.log('INIT');

            function timeoutTick() {
                if (scope.message.timeout === 0) {

                    scope.$emit('delete-message', id);
                    scope.show = false;

                    $document.off('mouseup', mouseup);
                    element.off('mousedown', mousedown);

                    $document.off('touchend', mouseup);
                    element.off('touchstart', mousedown);

                } else {
                    scope.message.timeout -= tick;

                    $timeout(timeoutTick, tick);
                }
            }

            function mousedown() {
                scope.$apply(() => {
                    console.log('mouse down');
                    scope.show = true;
                    $document.on('mouseup', mouseup);
                    $document.on('touchend', mouseup);

                    if (flagTick) {
                        flagTick = false;
                        $timeout(timeoutTick, tick);
                    }
                });
            }

            function mouseup() {
                scope.$apply(() => {
                    console.log('mouse up');
                    scope.show = false;
                    $document.off('mouseup', mouseup);
                    $document.off('touchend', mouseup);
                });
            }

            element.on('mousedown', mousedown);
            element.on('touchstart', mousedown);
        }
    }
};