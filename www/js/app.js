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

        module.exports = /*@ngInject*/["authorization", function (authorization) {

            var Login = function Login() {
                this.username = this.password = null;
            };

            Login.prototype = {

                clear: function clear() {
                    this.username = this.password = null;
                },

                getData: function getData() {
                    return {
                        username: this.username,
                        password: this.password
                    };
                },

                isFilled: function isFilled() {
                    return this.username != null && this.password != null;
                },

                signIn: function signIn(successCallback, errorCallback) {
                    var self = this;
                    authorization.login(self.getData(), function () {
                        self.clear();
                        successCallback();
                    }, errorCallback);
                }

            };

            return Login;
        }];
    }, {}], 3: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["authorization", function (authorization) {

            var Registration = function Registration() {
                this.username = this.email = this.password = null;
            };

            Registration.prototype = {

                clear: function clear() {
                    this.username = this.email = this.password = null;
                },

                getData: function getData() {
                    return {
                        username: this.username,
                        email: this.email,
                        password: this.password
                    };
                },

                isFilled: function isFilled() {
                    return this.username != null && this.password != null && this.email != null;
                },

                register: function register(successCallback, errorCallback) {
                    var self = this;
                    authorization.register(self.getData(), function () {
                        self.clear();
                        successCallback();
                    }, errorCallback);
                }

            };

            return Registration;
        }];
    }, {}], 4: [function (require, module, exports) {
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
    }, {}], 5: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$ionicPopup", function ($ionicPopup) {

            return {

                alert: (function (_alert) {
                    var _alertWrapper = function alert(_x) {
                        return _alert.apply(this, arguments);
                    };

                    _alertWrapper.toString = function () {
                        return _alert.toString();
                    };

                    return _alertWrapper;
                })(function (text) {
                    var alert = $ionicPopup.alert({
                        title: text
                    });
                    alert.then(function (res) {
                        console.log(res);
                    });
                })

            };
        }];
    }, {}], 6: [function (require, module, exports) {
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
                SIGN_UP: "Sign up",
                SIGN_IN: "Sign in"
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
                SIGN_UP: "Зарегистрироваться",
                SIGN_IN: "Войти"
            });

            $translateProvider.preferredLanguage("ru");
            $translateProvider.fallbackLanguage("ru");
        }];
    }, {}], 7: [function (require, module, exports) {
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
    }, {}], 8: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "authorization", "popup", function ($scope, $location, authorization, popup) {

            $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

            $scope.forgotPassword = function (email) {
                authorization.forgotPassword({
                    email: email
                }, function () {
                    popup.alert("New password sent to your specified mailbox");
                }, function () {
                    console.log("Fail");
                });
            };
        }];
    }, {}], 9: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "Login", "popup", function ($scope, $location, Login, popup) {

            $scope.model = new Login();

            $scope.signIn = function () {
                $scope.model.signIn(function () {
                    $location.path("/app/main");
                }, function () {
                    popup.alert("Something wrong!");
                });
            };

            $scope.goRegistration = function () {
                $location.path("/registration");
            };

            $scope.goForgotPassword = function () {
                $location.path("/forgot");
            };
        }];
    }, {}], 10: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "Registration", "popup", function ($scope, $location, Registration, popup) {

            $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

            $scope.model = new Registration();

            $scope.register = function () {
                $scope.model.register(function () {
                    $location.path("/app/main");
                }, function () {
                    popup.alert("Something wrong!");
                });
            };
        }];
    }, {}], 11: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", function ($scope) {}];
    }, {}], 12: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "authorization", "$location", function ($scope, $translate, authorization, $location) {

            $scope.logout = function () {
                authorization.logout(function () {
                    $location.path("/login");
                });
            };
        }];
    }, {}], 13: [function (require, module, exports) {
        "use strict";

        angular.module("common", []).service("urls_api", require("./common/urls_api")).service("popup", require("./common/services/popup")).service("authorization", require("./common/services/authorization")).factory("Login", require("./common/services/Login")).factory("Registration", require("./common/services/Registration"));

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
    }, { "./common/router": 1, "./common/services/Login": 2, "./common/services/Registration": 3, "./common/services/authorization": 4, "./common/services/popup": 5, "./common/translate": 6, "./common/urls_api": 7, "./components/forgot/forgot-controller": 8, "./components/login/login-controller": 9, "./components/registration/registration-controller": 10, "./components/settings/settings-controller": 11, "./components/sidebar/sidebar-controller": 12 }] }, {}, [13]);
//# sourceMappingURL=data:application/json;base64,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QkFBb0IsUUFBUTs7UUFHNUMsUUFBUSxPQUFPLGdCQUFnQixJQUMxQixXQUFXLDBCQUEwQixRQUFROztRQUVsRCxRQUFRLE9BQU8sWUFBWSxJQUN0QixXQUFXLHNCQUFzQixRQUFROztRQUU5QyxRQUFRLE9BQU8sT0FBTyxDQUNkLFNBQ0EsYUFDQSxxQkFDQSwwQkFDQSxXQUNBLFNBQ0EsZ0JBQ0EsVUFDQSxZQUNBLFdBR0gsT0FBTyxRQUFRLHVCQUVmLE9BQU8sUUFBUSxvQkFFZix1QkFBSSxVQUFTLGdCQUFnQjtZQUMxQixlQUFlLE1BQU0sWUFBVzs7O2dCQUc1QixJQUFHLE9BQU8sV0FBVyxPQUFPLFFBQVEsUUFBUSxVQUFVO29CQUNsRCxPQUFPLFFBQVEsUUFBUSxTQUFTLHlCQUF5Qjs7Z0JBRTdELElBQUcsT0FBTyxXQUFXO29CQUNqQixPQUFPLFVBQVU7OztZQUs1Qiw4REFBSSxVQUFTLGdCQUFnQix1QkFBdUIsWUFBWTtZQUM3RCxlQUFlLE1BQU0sWUFBVztnQkFDNUIsc0JBQXNCLHVCQUNqQixLQUFLLFVBQVUsVUFBVTtvQkFDdEIsV0FBVyxJQUFLLFNBQVMsTUFBTyxNQUFNLEtBQUs7OztZQUsxRCxtQ0FBSSxVQUFTLGVBQWUsV0FBVztZQUNwQyxjQUFjLFVBQVUsWUFBVztnQkFDL0IsVUFBVSxLQUFLO2VBQ2hCLFlBQVc7Z0JBQ1YsVUFBVSxLQUFLOzs7T0FLekIsRUFBQyxtQkFBa0IsR0FBRSwyQkFBMEIsR0FBRSxrQ0FBaUMsR0FBRSxtQ0FBa0MsR0FBRSwyQkFBMEIsR0FBRSxzQkFBcUIsR0FBRSxxQkFBb0IsR0FBRSx5Q0FBd0MsR0FBRSx1Q0FBc0MsR0FBRSxxREFBb0QsSUFBRyw2Q0FBNEMsSUFBRywyQ0FBMEMsU0FBTSxJQUFHLENBQUMsS0FBSSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjb21tb24nLCBbXSlcclxuICAgIC5zZXJ2aWNlKCd1cmxzX2FwaScsIHJlcXVpcmUoJy4vY29tbW9uL3VybHNfYXBpJykpXHJcbiAgICAuc2VydmljZSgncG9wdXAnLCByZXF1aXJlKCcuL2NvbW1vbi9zZXJ2aWNlcy9wb3B1cCcpKVxyXG4gICAgLnNlcnZpY2UoJ2F1dGhvcml6YXRpb24nLCByZXF1aXJlKCcuL2NvbW1vbi9zZXJ2aWNlcy9hdXRob3JpemF0aW9uJykpXHJcbiAgICAuZmFjdG9yeSgnTG9naW4nLCByZXF1aXJlKCcuL2NvbW1vbi9zZXJ2aWNlcy9Mb2dpbicpKVxyXG4gICAgLmZhY3RvcnkoJ1JlZ2lzdHJhdGlvbicsIHJlcXVpcmUoJy4vY29tbW9uL3NlcnZpY2VzL1JlZ2lzdHJhdGlvbicpKTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2lkZWJhcicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1jb250cm9sbGVyJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdsb2dpbicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2ZvcmdvdCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0ZvcmdvdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZm9yZ290L2ZvcmdvdC1jb250cm9sbGVyJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdyZWdpc3RyYXRpb24nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NldHRpbmdzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcclxuICAgICAgICAnaW9uaWMnLFxyXG4gICAgICAgICduZ0NvcmRvdmEnLFxyXG4gICAgICAgICdMb2NhbEZvcmFnZU1vZHVsZScsXHJcbiAgICAgICAgJ3Bhc2NhbHByZWNodC50cmFuc2xhdGUnLFxyXG4gICAgICAgICdzaWRlYmFyJyxcclxuICAgICAgICAnbG9naW4nLFxyXG4gICAgICAgICdyZWdpc3RyYXRpb24nLFxyXG4gICAgICAgICdmb3Jnb3QnLFxyXG4gICAgICAgICdzZXR0aW5ncycsXHJcbiAgICAgICAgJ2NvbW1vbidcclxuICAgIF0pXHJcblxyXG4gICAgLmNvbmZpZyhyZXF1aXJlKCcuL2NvbW1vbi90cmFuc2xhdGUnKSlcclxuXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29tbW9uL3JvdXRlcicpKVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5TdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJGNvcmRvdmFHbG9iYWxpemF0aW9uLCAkdHJhbnNsYXRlKSB7XHJcbiAgICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRjb3Jkb3ZhR2xvYmFsaXphdGlvbi5nZXRQcmVmZXJyZWRMYW5ndWFnZSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAkdHJhbnNsYXRlLnVzZSgobGFuZ3VhZ2UudmFsdWUpLnNwbGl0KFwiLVwiKVswXSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgLnJ1bihmdW5jdGlvbihhdXRob3JpemF0aW9uLCAkbG9jYXRpb24pIHtcclxuICAgICAgICBhdXRob3JpemF0aW9uLmNoZWNrQXV0aChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hcHAvbWFpbicpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==