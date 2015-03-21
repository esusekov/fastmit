"use strict";

module.exports = /*@ngInject*/ function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'js/app/components/login/login.html',
            controller: 'LoginController'
        })

        .state('registration', {
            url: '/registration',
            templateUrl: 'js/app/components/registration/registration.html',
            controller: 'RegistrationController'
        })

        .state('forgot', {
            url: '/forgot',
            templateUrl: 'js/app/components/forgot/forgot.html',
            controller: 'ForgotController'
        })

        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'js/app/components/sidebar/sidebar.html',
            controller: 'SidebarController'
        })

        .state('app.main', {
            url: '/main',
            views: {
                'menuContent': {
                    templateUrl: 'js/app/components/main-page/main.html',
                    controller: 'MainController'
                }
            }
        })

        .state('app.friends', {
            url: '/friends',
            views: {
                'menuContent': {
                    templateUrl: 'js/app/components/friends-page/friends.html',
                    controller: 'FriendsController'
                }
            }
        })

        .state('app.friends.all', {
            url: '/all',
            views: {
                'friendsAll': {
                    templateUrl: 'js/app/components/friends-page/all-friends.html'
                }
            }
        })

        .state('app.friends.online', {
            url: '/online',
            views: {
                'friendsOnline': {
                    templateUrl: 'js/app/components/friends-page/online-friends.html'
                }
            }
        })

        .state('app.settings', {
            url: '/settings',
            views: {
                'menuContent': {
                    templateUrl: 'js/app/components/settings/settings.html',
                    controller: 'SettingsController'
                }
            }
        })

        .state('app.chat', {
            url: '/chat',
            views: {
                'menuContent': {
                    templateUrl: 'js/app/components/chat/chat.html'
                }
            }
        });


    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/main');
};