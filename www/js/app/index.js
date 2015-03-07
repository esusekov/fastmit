"use strict";

angular.module('sidebar', ['ionic'])
    .controller('SidebarController', require('./components/sidebar/sidebar-controller'));

angular.module('app', ['ionic', 'ngCordova', 'pascalprecht.translate', 'sidebar'])
    .config(require('./shared/translate'))
    .config(require('./shared/router'))
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
    });