"use strict";

module.exports = /*@ngInject*/ function($scope, $ionicPopup, settingsService, storageService, httpService, cameraService) {

    $scope.imagePopupConfig = {
        getPhoto(from) {
            switch (from) {
                case 'camera':
                    cameraService.makePhoto({
                        allowEdit: true
                    }).then(() => {
                        return httpService.changeAvatar(cameraService.image);
                    }).then(() => {
                        $scope.currentUser.photoUrl = cameraService.image;
                        storageService.getCurrentUserinfo($scope.currentUser);
                    });
                    break;
                case 'gallery':
                    cameraService.makePhoto({
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        allowEdit: true
                    }).then(() => {
                        return httpService.changeAvatar(cameraService.image);
                    }).then(() => {
                        $scope.currentUser.photoUrl = cameraService.image;
                        storageService.getCurrentUserinfo($scope.currentUser);
                    });
                    break;
            }
            $scope.imagePopup.close();
        }
    };

    $scope.languagePopupConfig = {
        setLanguage(lang) {
            settingsService.changeLanguage(lang);
            $scope.languagePopup.close();
        }
    };

    storageService.getCurrentUserinfo().then((info) => {
        $scope.currentUser = info;
    });

    $scope.changeAvatar = function() {
        $scope.imagePopup = $ionicPopup.show({
            templateUrl: 'js/app/components/popups/image-popup.html',
            title: '',
            cssClass: 'image-popup',
            scope: $scope
        });
    };

    $scope.changeLanguage = function(lang) {
        $scope.languagePopup = $ionicPopup.show({
            templateUrl: 'js/app/components/popups/language-popup.html',
            title: '',
            cssClass: 'language-popup',
            scope: $scope
        });
    };

    $scope.languageName = function() {
        return settingsService.fullLanguageName;
    };

    $scope.notificationsEnabled = function() {
        return settingsService.notification;
    };

    $scope.changeNotification = function() {
        settingsService.changeNotification();
    };


};
