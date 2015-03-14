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

        module.exports = /*@ngInject*/["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state("login", {
                url: "/login",
                templateUrl: "js/app/components/login/login.html",
                controller: "LoginController"
            }).state("registration", {
                url: "/registration",
                templateUrl: "js/app/components/registration/registration.html",
                controller: "RegistrationController"
            }).state("forgot", {
                url: "/forgot",
                templateUrl: "js/app/components/forgot/forgot.html",
                controller: "ForgotController"
            }).state("app", {
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
                        templateUrl: "js/app/components/settings/settings.html",
                        controller: "SettingsController"
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
            //$urlRouterProvider.otherwise('/app/main');
        }];
    }, {}], 2: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$localForage", "$http", "urls_api", function ($localForage, $http, urls_api) {

            var AUTH_TOKEN_KEY = "AUTH_TOKEN_KEY";
            var token = null;

            return {

                checkAuth: function checkAuth(successCallback, errorCallback) {
                    $localForage.getItem(AUTH_TOKEN_KEY).then(function (data) {
                        console.log(data);
                        if (data != null) {
                            token = data;
                            if (successCallback != null) {
                                successCallback();
                            }
                        } else {
                            if (errorCallback != null) {
                                errorCallback();
                            }
                        }
                    });
                },

                register: function register(data, successCallback, errorCallback) {
                    $http.post(urls_api.registration, data).then(function (result) {
                        console.log(result);
                        token = result.data.token;
                        if (successCallback != null) {
                            successCallback();
                        }
                    })["catch"](function () {
                        if (errorCallback != null) {
                            errorCallback();
                        }
                    });
                },

                login: function login(data, successCallback, errorCallback) {
                    $http.post(urls_api.login, data).then(function (result) {
                        token = result.data.token;
                        $localForage.setItem(AUTH_TOKEN_KEY, token).then(function () {
                            if (successCallback != null) {
                                successCallback();
                            }
                        });
                    })["catch"](function () {
                        if (errorCallback != null) {
                            errorCallback();
                        }
                    });
                },

                logout: function logout(successCallback) {
                    $localForage.removeItem(AUTH_TOKEN_KEY).then(function () {
                        token = null;

                        if (successCallback != null) {
                            successCallback();
                        }
                    });
                },

                forgotPassword: function forgotPassword(data, successCallback, errorCallback) {
                    $http.get(urls_api.forgot, data).then(function () {
                        if (successCallback != null) {
                            successCallback();
                        }
                    })["catch"](function () {
                        if (errorCallback != null) {
                            errorCallback();
                        }
                    });
                },

                getToken: function getToken() {
                    return token;
                },

                isAuth: function isAuth() {
                    return token != null;
                }

            };
        }];
    }, {}], 3: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$translateProvider", function ($translateProvider) {
            $translateProvider.translations("en", {
                MAIN: "Main",
                FRIENDS: "Friends",
                SETTINGS: "Settings",
                LOGIN: "Login",
                LOGOUT: "Logout",
                REGISTRATION: "Registration",
                FORGOT: "Forgot password",
                CONFIRM: "Confirm",
                SIGN_UP: "Sign up"
            });

            $translateProvider.translations("ru", {
                MAIN: "Главная",
                FRIENDS: "Друзья",
                SETTINGS: "Настройки",
                LOGIN: "Вход",
                LOGOUT: "Выxод",
                REGISTRATION: "Регистрация",
                FORGOT: "Забыли пароль",
                CONFIRM: "Подтвердить",
                SIGN_UP: "Зарегистрироваться"
            });

            $translateProvider.preferredLanguage("ru");
            $translateProvider.fallbackLanguage("ru");
        }];
    }, {}], 4: [function (require, module, exports) {
        "use strict";

        var main_url = "https://private-03570-fastmitapi.apiary-mock.com/some-secret-api";

        module.exports = /*@ngInject*/function () {

            return {
                login: main_url + "/login",

                logout: main_url + "/logout",

                registration: main_url + "/registration",

                forgot: main_url + "/forgot-password"
            };
        };
    }, {}], 5: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "authorization", function ($scope, $location, authorization) {

            $scope.forgotPassword = function (email) {
                authorization.forgotPassword({
                    email: email
                }, function () {
                    console.log("Ok");
                }, function () {
                    console.log("Fail");
                });
            };
        }];
    }, {}], 6: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "authorization", function ($scope, $location, authorization) {

            $scope.login = function (username, password) {
                console.log($scope.username, $scope.password);
                if (username != null && password != null) {
                    authorization.login({
                        username: username,
                        password: password
                    }, function () {
                        $location.path("/app/main");
                    }, function () {
                        console.log("Error: login fail");
                    });
                }
            };

            $scope.goRegistration = function () {
                $location.path("/registration");
            };

            $scope.goForgotPassword = function () {
                $location.path("/forgot");
            };
        }];
    }, {}], 7: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "authorization", function ($scope, $location, authorization) {

            $scope.username = $scope.email = $scope.password = "";

            $scope.register = function (username, email, password) {
                console.log($scope.username);
                authorization.register({
                    username: username,
                    email: email,
                    password: password
                }, function () {
                    $location.path("/app/main");
                }, function () {
                    console.log("Error registration");
                });
            };
        }];
    }, {}], 8: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", function ($scope) {}];
    }, {}], 9: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "authorization", "$location", function ($scope, $translate, authorization, $location) {

            $scope.logout = function () {

                authorization.logout(function () {
                    $location.path("/login");
                    console.log(authorization.getToken());
                });
            };
        }];
    }, {}], 10: [function (require, module, exports) {
        "use strict";

        angular.module("common", []).factory("urls_api", require("./common/urls_api")).factory("authorization", require("./common/services/authorization"));

        angular.module("sidebar", []).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("login", []).controller("LoginController", require("./components/login/login-controller"));

        angular.module("forgot", []).controller("ForgotController", require("./components/forgot/forgot-controller"));

        angular.module("registration", []).controller("RegistrationController", require("./components/registration/registration-controller"));

        angular.module("settings", []).controller("SettingsController", require("./components/settings/settings-controller"));

        angular.module("app", ["ionic", "ngCordova", "LocalForageModule", "pascalprecht.translate", "sidebar", "login", "registration", "forgot", "settings", "common"]).config(require("./common/translate")).config(require("./common/router")).run(["$ionicPlatform", function ($ionicPlatform) {
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
        }]).run(["authorization", "$location", function (authorization, $location) {

            authorization.checkAuth(function () {
                $location.path("/app/main");
            }, function () {
                $location.path("/login");
            });
        }]);
    }, { "./common/router": 1, "./common/services/authorization": 2, "./common/translate": 3, "./common/urls_api": 4, "./components/forgot/forgot-controller": 5, "./components/login/login-controller": 6, "./components/registration/registration-controller": 7, "./components/settings/settings-controller": 8, "./components/sidebar/sidebar-controller": 9 }] }, {}, [10]);
//# sourceMappingURL=data:application/json;base64,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O2dCQUU3RCxJQUFHLE9BQU8sV0FBVztvQkFDakIsT0FBTyxVQUFVOzs7WUFLNUIsOERBQUksVUFBUyxnQkFBZ0IsdUJBQXVCLFlBQVk7WUFDN0QsZUFBZSxNQUFNLFlBQVc7Z0JBQzVCLHNCQUFzQix1QkFDakIsS0FBSyxVQUFVLFVBQVU7b0JBQ3RCLFdBQVcsSUFBSSxTQUFVLE1BQU8sTUFBTSxLQUFLOzs7WUFLMUQsbUNBQUksVUFBUyxlQUFlLFdBQVc7O1lBRXBDLGNBQWMsVUFBVSxZQUFXO2dCQUMvQixVQUFVLEtBQUs7ZUFDaEIsWUFBVztnQkFDVixVQUFVLEtBQUs7OztPQU16QixFQUFDLG1CQUFrQixHQUFFLG1DQUFrQyxHQUFFLHNCQUFxQixHQUFFLHFCQUFvQixHQUFFLHlDQUF3QyxHQUFFLHVDQUFzQyxHQUFFLHFEQUFvRCxHQUFFLDZDQUE0QyxHQUFFLDJDQUEwQyxRQUFLLElBQUcsQ0FBQyxLQUFJIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2NvbW1vbicsIFtdKVxyXG4gICAgLmZhY3RvcnkoJ3VybHNfYXBpJywgcmVxdWlyZSgnLi9jb21tb24vdXJsc19hcGknKSlcclxuICAgIC5mYWN0b3J5KCdhdXRob3JpemF0aW9uJywgcmVxdWlyZSgnLi9jb21tb24vc2VydmljZXMvYXV0aG9yaXphdGlvbicpKTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2lkZWJhcicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1jb250cm9sbGVyJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdsb2dpbicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2ZvcmdvdCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0ZvcmdvdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZm9yZ290L2ZvcmdvdC1jb250cm9sbGVyJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdyZWdpc3RyYXRpb24nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NldHRpbmdzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcclxuICAgICAgICAnaW9uaWMnLFxyXG4gICAgICAgICduZ0NvcmRvdmEnLFxyXG4gICAgICAgICdMb2NhbEZvcmFnZU1vZHVsZScsXHJcbiAgICAgICAgJ3Bhc2NhbHByZWNodC50cmFuc2xhdGUnLFxyXG4gICAgICAgICdzaWRlYmFyJyxcclxuICAgICAgICAnbG9naW4nLFxyXG4gICAgICAgICdyZWdpc3RyYXRpb24nLFxyXG4gICAgICAgICdmb3Jnb3QnLFxyXG4gICAgICAgICdzZXR0aW5ncycsXHJcbiAgICAgICAgJ2NvbW1vbidcclxuICAgIF0pXHJcblxyXG4gICAgLmNvbmZpZyhyZXF1aXJlKCcuL2NvbW1vbi90cmFuc2xhdGUnKSlcclxuXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29tbW9uL3JvdXRlcicpKVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5TdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJGNvcmRvdmFHbG9iYWxpemF0aW9uLCAkdHJhbnNsYXRlKSB7XHJcbiAgICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRjb3Jkb3ZhR2xvYmFsaXphdGlvbi5nZXRQcmVmZXJyZWRMYW5ndWFnZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdHJhbnNsYXRlLnVzZSgobGFuZ3VhZ2UudmFsdWUpLnNwbGl0KFwiLVwiKVswXSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLnJ1bihmdW5jdGlvbihhdXRob3JpemF0aW9uLCAkbG9jYXRpb24pIHtcclxuXHJcbiAgICAgICAgYXV0aG9yaXphdGlvbi5jaGVja0F1dGgoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYXBwL21haW4nKTtcclxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9