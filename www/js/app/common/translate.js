"use strict";

module.exports = /*@ngInject*/ function($translateProvider) {
    $translateProvider.translations('en', {
        MAIN: 'Main',
        FRIENDS: 'Friends',
        ALL_FRIENDS: 'Friends',
        ONLINE_FRIENDS: 'Online',
        SETTINGS: 'Settings',
        LOGIN: 'Login',
        LOGOUT: 'Logout',
        REGISTRATION: 'Registration',
        FORGOT: 'Forgot password',
        CONFIRM: 'Confirm',
        SIGN_UP: 'Sign up'
    });

    $translateProvider.translations('ru', {
        MAIN: 'Главная',
        FRIENDS: 'Друзья',
        ALL_FRIENDS: 'Друзей',
        ONLINE_FRIENDS: 'В сети',
        SETTINGS: 'Настройки',
        LOGIN: 'Вход',
        LOGOUT: 'Выxод',
        REGISTRATION: 'Регистрация',
        FORGOT: 'Забыли пароль',
        CONFIRM: 'Подтвердить',
        SIGN_UP: 'Зарегистрироваться'
    });

    $translateProvider.preferredLanguage("ru");
    $translateProvider.fallbackLanguage("ru");
};