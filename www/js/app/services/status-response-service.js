"use strict";

module.exports = /*@ngInject*/ function() {

    var statusesResponses = {
        DISCONNECT: 'Ошибка: проверьте соединение с интернетом!',

        USER_EXIST: 'Пользователь с таким именем уже существует!',
        WRONG_EMAIL: 'Указанный email уже используется!',

        ACCESS_DENIED: 'Ошибка: несанкционированный доступ!',
        WRONG_LOGIN_PASSWORD: 'Неправильно введен логин или пароль!',

        WRONG_OLD_PASSWORD: 'Неправильно введен старый пароль!',

        WRONG_TEMPORARY_PASSWORD: 'Неправильно введен временный пароль!',

        ERROR: 'Произошла ошибка, попробуйте повторить еще раз!'
    };

    function checkStatusInternet(data) {
        return data.status !== 0;
    }

    return {
        getTextForStatus(data) {
            if (data === 'access-denied') {
                return statusesResponses.ACCESS_DENIED;
            }

            try {
                if (checkStatusInternet(data)) {
                    switch (data.data.response) {
                        case 'User exists':
                            return statusesResponses.USER_EXIST;

                        case 'Email is already registered':
                            return statusesResponses.WRONG_EMAIL;

                        case 'Wrong login or password':
                            return statusesResponses.WRONG_LOGIN_PASSWORD;

                        case 'Wrong old password':
                            return statusesResponses.WRONG_OLD_PASSWORD;

                        case 'Wrong tmp password or expired':
                            return statusesResponses.WRONG_TEMPORARY_PASSWORD;

                        default:
                            return statusesResponses.ERROR;
                    }
                }

                return statusesResponses.DISCONNECT;
            } catch (error) {
                return statusesResponses.ERROR;
            }
        }
    };
};