"use strict";

module.exports = /*@ngInject*/ function($document, $timeout, $ionicModal,
    photosBoxService, eventer, popupService, TimeoutTouchModel) {

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'js/app/components/chat-page/templates/message-photo.html',
        scope: {
            message: '='
        },
        link: function(scope, element, attrs) {
            var message = scope.message;
            var messageId = message.messageId;

            if (message.isMy) {
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
            } else {
                scope.photo = photosBoxService.getPhoto(messageId);
                scope.stateLoading = scope.photo.stateLoading;
                scope.timeout = message.timeout;
                var stateLoading = scope.stateLoading;

                var timeoutTouch = new TimeoutTouchModel();

                $ionicModal.fromTemplateUrl('js/app/components/chat-page/templates/image.html', {
                    scope: scope,
                    animation: 'none'
                }).then(modal => {
                    scope.modal = modal;
                });

                function showPhoto() {
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

                        timeoutTouch.start(() => {
                            scope.timeout.start();
                            showPhoto();
                        });
                    } else if (stateLoading.isLoading) {

                    } else if (stateLoading.isNotLoaded) {
                        popupService.confirm('Попробывать загрузить фотографию еще раз?')
                            .then(() => {
                                eventer.emit('load-photo', messageId);
                            })
                            .catch(() => {
                                scope.$emit('remove-message', messageId);
                                photosBoxService.removePhotoById(messageId);
                            });
                    }
                }

                function mouseup() {
                    timeoutTouch.stop();
                    $document.off('touchend', mouseup);
                    hidePhoto();
                }

                element.on('touchstart', mousedown);
            }
        }
    }
};
