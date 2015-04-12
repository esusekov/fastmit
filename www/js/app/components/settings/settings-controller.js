"use strict";

module.exports = /*@ngInject*/ function($scope, settingsService) {

    $scope.settings = settingsService;

    $scope.changeNotification = function() {
        $scope.settings.changeNotification();
    };

    $scope.changeLanguage = function(lang) {
        $scope.settings.changeLanguage(lang);
    };

    $scope.isRus = function() {
        return $scope.settings.language === 'ru';
    };

    $scope.isEng = function() {
        return $scope.settings.language === 'en';
    };

};
