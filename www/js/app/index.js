"use strict";

var polyfills = require('./polyfills');
polyfills.array();
polyfills.object();

angular.module('friends', [])
    .directive('userItem', require('./common/friends/user-item'))
    .directive('friendItem', require('./common/friends/friend-item'));
//    .filter('friendChatUrl', require('./common/friends/friend-chat-url'))
//    .factory('UserModel', require('./common/friends/user-model'))
//    //.factory('FriendModel', require('./common/friends/friend-model'))
//    .factory('PotentialFriendModel', require('./common/friends/potential-friend-model'))
//    .factory('friendsFactory', require('./common/friends/friends-factory'))
//    //.factory('friendsService', require('./common/friends/friends-service'))
//    //.factory('contactsService', require('./common/friends/contacts-service'))
//    .directive('friendItem', require('./common/friends/friend-item'));

angular.module('models', [])
    .factory('MessageModel', require('./models/messages/message-model'))
    .factory('TimeoutPhotoModel', require('./models/timeout-photo-model'))

    .factory('InboxMessageModel', require('./models/messages/inbox-message-model'))
    .factory('OutboxMessageModel', require('./models/messages/outbox-message-model'))

    .factory('PhotoUploadModel', require('./models/photo-upload-model'))
    .factory('QueuePhotosLoaderModel', require('./models/queue-photos-loader-model'))

    .factory('UserModel', require('./models/user-model'))
    .factory('FriendModel', require('./models/friend-model'))
    .factory('PotentialFriendModel', require('./models/potential-friend-model'))
    .factory('FriendsModel', require('./models/friends-model'))
    .factory('PotentialFriendsModel', require('./models/potential-friends-model'))
    .factory('StateTransferModel', require('./models/state-transfer-model'))
    .factory('StateLoadingModel', require('./models/state-loading-model'));

angular.module('constants', [])
    .service('readyStateConstants', require('./constants/ready-state-constants'))
    .service('globalConstants', require('./constants/global-constants'))
    .service('statesTransferConstants', require('./constants/states-transfer-constants'))
    .service('typesMessagesConstants', require('./constants/types-messages-constants'))
    .service('statesLoadingConstants', require('./constants/states-loading-constants'));

angular.module('services', [])
    .service('urlsApi', require('./services/urls-api-service'))
    .service('popupService', require('./services/popup-service'))
    .factory('httpService', require('./services/http-service'))
    .factory('websocketService', require('./services/websocket-service'))
    .factory('websocketInteractionService', require('./services/websocket-interaction-service'))
    .factory('messagesBoxService', require('./services/messages-box-service'))
    .factory('messageFactoryService', require('./services/message-factory-service'))
    .factory('chatService', require('./services/chat-service'))

    .factory('photosBoxService', require('./services/photos-box-service'))
    .factory('photoLoaderService', require('./services/photo-loader-service'))

    .service('authorizationService', require('./services/authorization-service'))
    .factory('friendsService', require('./services/friends-service'))
    .factory('cameraService', require('./services/camera-service'))
    .service('storageService', require('./services/storage-service'));

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
    .directive('message', require('./components/chat-page/directives/message'))
    .directive('stateTransfer', require('./components/chat-page/directives/state-transfer'))
    .directive('text', require('./components/chat-page/directives/text'))
    .directive('photo', require('./components/chat-page/directives/photo'));

angular.module('utils', [])
    .factory('EventEmitter', require('./utils/event-emitter'))
    .factory('eventer', require('./utils/eventer'))
    .factory('generateRandomId', require('./utils/generate-random-id'));

angular.module('app', [
        'ionic',
        'ngCordova',
        'ngWebSocket',
        'ngCookies',
        'utils',
        'LocalForageModule',
        'pascalprecht.translate',

        'constants',
        'models',
        'services',

        'sidebar',
        'login',
        'registration',
        'forgot',
        'settings',
        'friends',
        //'common',
        'change-password',
        'main-page',
        'friends-page',
        'search-page',
        'chat-page',
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

    .run(function(authorizationService, $location, $q, $rootScope) {
        $rootScope.authCheck = $q.defer();

        authorizationService.checkAuth().then(() => {
            $location.path('/app/main');
        }).catch(() => {
            $location.path('/login');
        }).finally($rootScope.authCheck.resolve);
    });

