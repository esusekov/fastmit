"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) {
                    return a(o, !0);
                }if (i) {
                    return i(o, !0);
                }throw new Error("Cannot find module '" + o + "'");
            }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
})({ 1: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "$localForage", function ($scope, $translate, $localForage) {}];
    }, {}], 2: [function (require, module, exports) {
        "use strict";

        angular.module("sidebar", ["ionic"]).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("app", ["ionic", "ngCordova", "LocalForageModule", "pascalprecht.translate", "sidebar"]).config(["$localForageProvider", function ($localForageProvider) {
            console.log($localForageProvider);
            $localForageProvider.config({
                driver: "localStorageWrapper", // if you want to force a driver
                name: "myApp", // name of the database and prefix for your data, it is "lf" by default
                version: 1, // version of the database, you shouldn't have to use this
                storeName: "keyvaluepairs", // name of the table
                description: "some description"
            });
        }]).config(require("./shared/translate")).config(require("./shared/router")).run(["$ionicPlatform", function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    window.StatusBar.styleDefault();
                }
            });
        }]).run(["$ionicPlatform", "$cordovaGlobalization", "$translate", function ($ionicPlatform, $cordovaGlobalization, $translate) {
            $ionicPlatform.ready(function () {
                $cordovaGlobalization.getPreferredLanguage().then(function (language) {
                    $translate.use(language.value.split("-")[0]);
                });
            });
        }]);
    }, { "./components/sidebar/sidebar-controller": 1, "./shared/router": 3, "./shared/translate": 4 }], 3: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "js/app/components/sidebar/sidebar.html",
                controller: "SidebarController"
            }).state("app.main", {
                url: "/main",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/main/main.html"
                    }
                }
            }).state("app.friends", {
                url: "/friends",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/friends/friends.html"
                    }
                }
            }).state("app.settings", {
                url: "/settings",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/settings/settings.html"
                    }
                }
            }).state("app.chat", {
                url: "/chat",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/chat/chat.html"
                    }
                }
            });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise("/app/main");
        }];
    }, {}], 4: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$translateProvider", function ($translateProvider) {
            $translateProvider.translations("en", {
                MAIN: "Main",
                FRIENDS: "Friends",
                SETTINGS: "Settings"
            });

            $translateProvider.translations("ru", {
                MAIN: "Главная",
                FRIENDS: "Друзья",
                SETTINGS: "Настройки"
            });

            $translateProvider.preferredLanguage("ru");
            $translateProvider.fallbackLanguage("ru");
        }];
    }, {}] }, {}, [2]);
//# sourceMappingURL=data:application/json;base64,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QVE7UUFDekM7O1FBRUEsT0FBTyw4Q0FBd0IsVUFBUyxvQkFBb0I7WUFDeEQsbUJBQW1CLGFBQWEsTUFBTTtnQkFDbEMsTUFBTTtnQkFDTixTQUFTO2dCQUNULFVBQVU7OztZQUdkLG1CQUFtQixhQUFhLE1BQU07Z0JBQ2xDLE1BQU07Z0JBQ04sU0FBUztnQkFDVCxVQUFVOzs7WUFHZCxtQkFBbUIsa0JBQWtCO1lBQ3JDLG1CQUFtQixpQkFBaUI7O09BRXRDLE9BQUssSUFBRyxDQUFDLElBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2lkZWJhcicsIFsnaW9uaWMnXSlcclxuICAgIC5jb250cm9sbGVyKCdTaWRlYmFyQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXItY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ2lvbmljJywgJ25nQ29yZG92YScsICdMb2NhbEZvcmFnZU1vZHVsZScsICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJywgJ3NpZGViYXInIF0pXHJcbiAgICAuY29uZmlnKFsnJGxvY2FsRm9yYWdlUHJvdmlkZXInLCBmdW5jdGlvbigkbG9jYWxGb3JhZ2VQcm92aWRlcil7XHJcbiAgICAgICAgY29uc29sZS5sb2coJGxvY2FsRm9yYWdlUHJvdmlkZXIpO1xyXG4gICAgICAgICRsb2NhbEZvcmFnZVByb3ZpZGVyLmNvbmZpZyh7XHJcbiAgICAgICAgICAgIGRyaXZlciAgICAgIDogJ2xvY2FsU3RvcmFnZVdyYXBwZXInLCAvLyBpZiB5b3Ugd2FudCB0byBmb3JjZSBhIGRyaXZlclxyXG4gICAgICAgICAgICBuYW1lICAgICAgICA6ICdteUFwcCcsIC8vIG5hbWUgb2YgdGhlIGRhdGFiYXNlIGFuZCBwcmVmaXggZm9yIHlvdXIgZGF0YSwgaXQgaXMgXCJsZlwiIGJ5IGRlZmF1bHRcclxuICAgICAgICAgICAgdmVyc2lvbiAgICAgOiAxLjAsIC8vIHZlcnNpb24gb2YgdGhlIGRhdGFiYXNlLCB5b3Ugc2hvdWxkbid0IGhhdmUgdG8gdXNlIHRoaXNcclxuICAgICAgICAgICAgc3RvcmVOYW1lICAgOiAna2V5dmFsdWVwYWlycycsIC8vIG5hbWUgb2YgdGhlIHRhYmxlXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uIDogJ3NvbWUgZGVzY3JpcHRpb24nXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XSlcclxuICAgIC5jb25maWcocmVxdWlyZSgnLi9zaGFyZWQvdHJhbnNsYXRlJykpXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vc2hhcmVkL3JvdXRlcicpKVxyXG4gICAgLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xyXG4gICAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgICAgICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LlN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRjb3Jkb3ZhR2xvYmFsaXphdGlvbiwgJHRyYW5zbGF0ZSkge1xyXG4gICAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkY29yZG92YUdsb2JhbGl6YXRpb24uZ2V0UHJlZmVycmVkTGFuZ3VhZ2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRyYW5zbGF0ZS51c2UoKGxhbmd1YWdlLnZhbHVlKS5zcGxpdChcIi1cIilbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=