"use strict";

module.exports = /*@ngInject*/ function($document, $timeout, $ionicModal, photosBoxService, eventer) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/photo.html',
        scope: {
            messageId: '=',
            timeout: '='
        },
        link: function(scope, element, attrs) {
            scope.photo = photosBoxService.getPhoto(scope.messageId);
            scope.stateLoading = scope.photo.stateLoading;
            var stateLoading = scope.stateLoading;

            scope.getTextByStateLoading = function() {
                var text = null;

                if (stateLoading.isLoaded) {
                    text = 'Прикоснитесь, чтобы посмотреть фотографию';
                } else if (stateLoading.isLoading) {
                    text = 'Фотография загружается...';
                } else if (stateLoading.isNotLoaded) {
                    text = 'Не удалось загрузить фотографию';
                } else {
                    text = 'Новая фотография';
                }

                return text;
            };

            $ionicModal.fromTemplateUrl('js/app/components/chat-page/templates/photo-img.html', {
                scope: scope,
                animation: 'none'
            }).then(modal => {
                scope.modal = modal;
            });

            function showPhoto() {
                console.log('Show modal');
                
                scope.modal.show();
            }

            function hidePhoto() {
                scope.modal.hide();
            }

            scope.timeout.on('timeout-finish', () => {
                hidePhoto();
            });

            function mousedown() {
                if (stateLoading.isLoaded) {
                    $document.on('touchend', mouseup);
                    scope.timeout.start();
                    showPhoto();
                } else if (stateLoading.isLoading) {

                } else {
                    eventer.emit('load-photo', scope.messageId);
                }
            }

            function mouseup() {
                $document.off('touchend', mouseup);
                hidePhoto();
            }

            element.on('touchstart', mousedown);
        }
    }
};
