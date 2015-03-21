"use strict";

angular.module('common', [])
    .service('urls_api', require('./common/urls_api'))
    .service('popup', require('./common/services/popup'))
    .service('authorization', require('./common/services/authorization'))
    .factory('Login', require('./common/services/Login'))
    .factory('Registration', require('./common/services/Registration'));


angular.module('sidebar', [])
    .controller('SidebarController', require('./components/sidebar/sidebar-controller'));


angular.module('login', [])
    .controller('LoginController', require('./components/login/login-controller'));

angular.module('forgot', [])
    .controller('ForgotController', require('./components/forgot/forgot-controller'));


angular.module('registration', [])
    .controller('RegistrationController', require('./components/registration/registration-controller'));

angular.module('settings', [])
    .controller('SettingsController', require('./components/settings/settings-controller'));

angular.module('app', [
        'ionic',
        'ngCordova',
        'LocalForageModule',
        'pascalprecht.translate',
        'sidebar',
        'login',
        'registration',
        'forgot',
        'settings',
        'common'
    ])

    .config(require('./common/translate'))

    .config(require('./common/router'))

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                window.StatusBar.styleDefault();
            }
        });
    })

    .run(function($ionicPlatform, $cordovaGlobalization, $translate) {
        $ionicPlatform.ready(function() {
            $cordovaGlobalization.getPreferredLanguage()
                .then(function (language) {
                    $translate.use((language.value).split("-")[0]);
                });
        });
    })

    .run(function(authorization, $location) {
        authorization.checkAuth(function() {
            $location.path('/app/main');
        }, function() {
            $location.path('/login');
        });
    });

