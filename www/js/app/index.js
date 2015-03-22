"use strict";

var polyfills = require('./polyfills');
polyfills.array();

angular.module('friends', [])
    .factory('FriendModel', require('./common/friends/friend-model'))
    .factory('friendsFactory', require('./common/friends/friends-factory'))
    .factory('friendsService', require('./common/friends/friends-service'))
    .directive('friendItem', require('./common/friends/friend-item'));

angular.module('common', ['friends'])
    .service('urlsApi', require('./common/urls-api-service'))
    .service('popupService', require('./common/popup-service'))
    .service('authorizationService', require('./common/authorization-service'));


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
    .controller('SettingsController', require('./components/settings/settings-controller'));

angular.module('main-page', [])
    .controller('MainController', require('./components/main-page/main-controller'));

angular.module('friends-page', [])
    .controller('FriendsController', require('./components/friends-page/friends-controller'));

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
        'main-page',
        'friends-page',
        'common'
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

    .run(function($ionicPlatform, $cordovaGlobalization, $translate) {
        $ionicPlatform.ready(function() {
            $cordovaGlobalization.getPreferredLanguage()
                .then(function (language) {
                    $translate.use((language.value).split("-")[0]);
                });
        });
    })

    .run(function(authorizationService, $location) {
        authorizationService.checkAuth(function() {
            $location.path('/app/main');
        }, function() {
            $location.path('/login');
        });
    });

