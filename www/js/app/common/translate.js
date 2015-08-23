"use strict";

module.exports = /*@ngInject*/ function($translateProvider) {
    $translateProvider.translations('en', {
        MAIN: 'Main',
        FRIENDS: 'Friends',
        ALL_FRIENDS: 'Friends',
        ONLINE_FRIENDS: 'Online',
        REQUESTS: 'Requests',
        SEARCH: 'Search',
        SETTINGS: 'Settings',
        LOGIN: 'Login',
        LOGOUT: 'Logout',
        REGISTRATION: 'Registration',
        FORGOT: 'Forgot password',
        CONFIRM: 'Confirm',
        SIGN_UP: 'Sign up',
        SIGN_IN: 'Sign in',
        USERNAME: 'Username',
        PASSWORD: 'Password',
        EMAIL: 'Email',
        CHANGE_PASSWORD: 'Change password',
        ENTER_OLD_PASSWORD: 'Enter old password',
        ENTER_NEW_PASSWORD: 'Enter new password',
        REENTER_NEW_PASSWORD: 'Reenter new password'
    });

    $translateProvider.translations('ru', {
        MAIN: 'Главная',
        FRIENDS: 'Друзья',
        ALL_FRIENDS: 'Друзей',
        ONLINE_FRIENDS: 'В сети',
        REQUESTS: 'Заявки',
        SEARCH: 'Поиск',
        SETTINGS: 'Настройки',
        LOGIN: 'Вход',
        LOGOUT: 'Выxод',
        REGISTRATION: 'Регистрация',
        FORGOT: 'Забыли пароль',
        CONFIRM: 'Подтвердить',
        SIGN_UP: 'Зарегистрироваться',
        SIGN_IN: 'Войти',
        USERNAME: 'Логин',
        PASSWORD: 'Пароль',
        EMAIL: 'Адрес электронной почты',
        CHANGE_PASSWORD: 'Изменить пароль',
        ENTER_OLD_PASSWORD: 'Введите старый пароль',
        ENTER_NEW_PASSWORD: 'Введите новый пароль',
        REENTER_NEW_PASSWORD: 'Повторно введите новый пароль'
    });

    $translateProvider.preferredLanguage('ru');
    $translateProvider.fallbackLanguage('ru');
};