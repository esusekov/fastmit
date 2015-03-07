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

        module.exports = /*@ngInject*/["$scope", "$translate", function ($scope, $translate) {}];
    }, {}], 2: [function (require, module, exports) {
        "use strict";

        angular.module("sidebar", ["ionic"]).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("app", ["ionic", "ngCordova", "pascalprecht.translate", "sidebar"]).config(require("./shared/translate")).config(require("./shared/router")).run(["$ionicPlatform", function ($ionicPlatform) {
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
//# sourceMappingURL=data:application/json;base64,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LFNBQVM7Z0JBQ1QsVUFBVTs7O1lBR2QsbUJBQW1CLGtCQUFrQjtZQUNyQyxtQkFBbUIsaUJBQWlCOztPQUV0QyxPQUFLLElBQUcsQ0FBQyxJQUFHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3NpZGViYXInLCBbJ2lvbmljJ10pXHJcbiAgICAuY29udHJvbGxlcignU2lkZWJhckNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgWydpb25pYycsICduZ0NvcmRvdmEnLCAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsICdzaWRlYmFyJ10pXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vc2hhcmVkL3RyYW5zbGF0ZScpKVxyXG4gICAgLmNvbmZpZyhyZXF1aXJlKCcuL3NoYXJlZC9yb3V0ZXInKSlcclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5TdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbiAgICAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkY29yZG92YUdsb2JhbGl6YXRpb24sICR0cmFuc2xhdGUpIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGNvcmRvdmFHbG9iYWxpemF0aW9uLmdldFByZWZlcnJlZExhbmd1YWdlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0cmFuc2xhdGUudXNlKChsYW5ndWFnZS52YWx1ZSkuc3BsaXQoXCItXCIpWzBdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9