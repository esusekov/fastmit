"use strict";

angular.module('common', [])
    .service('urlsApi', require('./common/urls-api-service'))
    .service('popupService', require('./common/popup-service'))
    .service('authorizationService', require('./common/authorization-service'));

angular.module('users', [])
    .factory('User', require('./common/users/user-model'))
    .factory('usersFactory', require('./common/users/users-factory'));

angular.module('sidebar', [])
    .controller('SidebarController', require('./components/sidebar/sidebar-controller'));

angular.module('login', [])
    .controller('LoginController', require('./components/login/login-controller'))
    .factory('LoginModel', require('./components/login/login-model'));

angular.module('forgot', [])
    .controller('ForgotController', require('./components/forgot/forgot-controller'));

angular.module('registration', [])
    .controller('RegistrationController', require('./components/registration/registration-controller'))
    .factory('RegistrationModel', require('./components/registration/registration-model'));

angular.module('settings', [])
    .controller('SettingsController', require('./components/settings/settings-controller'))
    .service('settingsDescription', require('./components/settings/settings-description'))
    .service('settingsService', require('./components/settings/settings-service'));

angular.module('change-password', [])
    .controller('ChangePasswordController', require('./components/change-password/change-password-controller'))
    .service('changePasswordModel', require('./components/change-password/change-password-model'));


angular.module('friends', [])
    .factory('friendsService', require('./components/friends/friends-service'))
    .controller('FriendsController', require('./components/friends/friends-controller'));

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
        'friends',
        'common',
        'users',
        'change-password'
    ])

    .config(require('./common/translate'))

    .config(require('./common/router'))

    .constant('$ionicLoadingConfig', {
        template: '<i class="icon ion-loading-c"></i>',
        noBackdrop: true
    })

    .run(function($ionicPlatform, $ionicSideMenuDelegate) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                window.StatusBar.styleDefault();
            }

            document.addEventListener('touchstart', function (event) {
                // workaround for Android
                if ($ionicSideMenuDelegate.isOpenLeft()) {
                    event.preventDefault();
                }
            });
        });
    })

    .run(function($ionicPlatform, settingsService, settingsDescription) {
        $ionicPlatform.ready(function() {

            //settingsDescription.then(description => {
            //    settingsService.init(description, settings => {
            //        console.log(settings.langua);
            //        $translate.use(settings.language);
            //    });
            //});
            console.log(settingsDescription);
            settingsService.init(settingsDescription);

        });
    })

    .run(function(authorizationService, $location) {
        authorizationService.checkAuth(function() {
            $location.path('/app/main');
        }, function() {
            $location.path('/login');
        });
    });

