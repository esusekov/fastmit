"use strict";

module.exports = /*@ngInject*/ function($translateProvider) {
    $translateProvider.translations('en', {
        MAIN: 'Main',
        FRIENDS: 'Friends',
        SETTINGS: 'Settings'
    });

    $translateProvider.translations('ru', {
        MAIN: 'Главная',
        FRIENDS: 'Друзья',
        SETTINGS: 'Настройки'
    });

    $translateProvider.preferredLanguage("ru");
    $translateProvider.fallbackLanguage("ru");
};