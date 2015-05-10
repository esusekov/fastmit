"use strict";

var polyfills = require('./polyfills');
polyfills.array();

angular.module('friends', [])
    .filter('friendChatUrl', require('./common/friends/friend-chat-url'))
    .factory('UserModel', require('./common/friends/user-model'))
    .factory('FriendModel', require('./common/friends/friend-model'))
    .factory('PotentialFriendModel', require('./common/friends/potential-friend-model'))
    .factory('friendsFactory', require('./common/friends/friends-factory'))
    .factory('friendsService', require('./common/friends/friends-service'))
    .factory('contactsService', require('./common/friends/contacts-service'))
    .directive('friendItem', require('./common/friends/friend-item'));

angular.module('common', ['friends'])
    .service('urlsApi', require('./common/urls-api-service'))
    .service('popupService', require('./common/popup-service'))
    .factory('httpService', require('./common/http-service'))
    .service('authorizationService', require('./common/authorization-service'))
    .factory('correspondenceModel', require('./common/correspondence-model'))
    .factory('messageModel', require('./common/message-model'))
    .factory('websocketService', require('./common/websocket-service'));

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


angular.module('main-page', [])
    .controller('MainController', require('./components/main-page/main-controller'));

angular.module('friends-page', [])
    .controller('FriendsController', require('./components/friends-page/friends-controller'));

angular.module('search-page', [])
    .controller('SearchController', require('./components/search-page/search-controller'));

angular.module('chat-page', [])
    .controller('ChatController', require('./components/chat-page/chat-controller'))
    .directive('myMessage', require('./components/chat-page/directives/my-message'))
    .directive('companionMessage', require('./components/chat-page/directives/companion-message'));


angular.module('app', [
        'ionic',
        'ngCordova',
        'ngWebSocket',
        'LocalForageModule',
        'pascalprecht.translate',
        'sidebar',
        'login',
        'registration',
        'forgot',
        'settings',
        'friends',
        'common',
        'change-password',
        'main-page',
        'friends-page',
        'search-page',
        'chat-page',
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
        authorizationService.checkAuth().then(() => {
            $location.path('/app/main');
        }).catch(() => {
            $location.path('/login');
        });
    });

