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

        module.exports = /*@ngInject*/["$localForage", "$http", "urlsApi", function ($localForage, $http, urlsApi) {

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
                    $http.post(urlsApi.registration, data).then(function (result) {
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
                    $http.post(urlsApi.login, data).then(function (result) {
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
                    $http.get(urlsApi.forgot, data).then(function () {
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
    }, {}], 2: [function (require, module, exports) {
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
    }, {}], 3: [function (require, module, exports) {
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
                        templateUrl: "js/app/components/friends/friends.html",
                        controller: "FriendsController"
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
    }, {}], 4: [function (require, module, exports) {
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
    }, {}], 5: [function (require, module, exports) {
        "use strict";

        var main_url = "https://private-03570-fastmitapi.apiary-mock.com/some-secret-api";

        module.exports = /*@ngInject*/function () {

            return {
                login: main_url + "/login",

                logout: main_url + "/logout",

                registration: main_url + "/registration",

                forgot: main_url + "/forgot-password",

                friendsList: main_url + "/friends"
            };
        };
    }, {}], 6: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {

            function User(source) {
                this.__id = source.id;
                this.__username = source.username;
                this.__isOnline = source.isOnline || false;
                this.__isFriend = source.isFriend || true;
                this.__photoUrl = source.photoUrl;
            }

            User.prototype = Object.defineProperties({

                online: function online() {
                    this.__isOnline = true;
                },

                offline: function offline() {
                    this.__isOnline = false;
                }
            }, {
                id: {
                    get: function () {
                        return this.__id;
                    },
                    configurable: true,
                    enumerable: true
                },
                username: {
                    get: function () {
                        return this.__username;
                    },
                    configurable: true,
                    enumerable: true
                },
                isOnline: {
                    get: function () {
                        return this.__isOnline;
                    },
                    configurable: true,
                    enumerable: true
                },
                isFriend: {
                    get: function () {
                        return this.__isFriend;
                    },
                    configurable: true,
                    enumerable: true
                },
                photoUrl: {
                    get: function () {
                        return this.__photoUrl;
                    },
                    configurable: true,
                    enumerable: true
                }
            });

            return User;
        };
    }, {}], 7: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["User", function (User) {
            return {
                create: function create(source) {
                    return new User(source);
                }
            };
        }];
    }, {}], 8: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "authorizationService", "popupService", function ($scope, $location, authorizationService, popupService) {

            $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

            $scope.forgotPassword = function (email) {
                authorizationService.forgotPassword({
                    email: email
                }, function () {
                    popupService.alert("New password sent to your specified mailbox");
                }, function () {
                    console.log("Fail");
                });
            };
        }];
    }, {}], 9: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$ionicLoading", "friendsService", function ($scope, $ionicLoading, friendsService) {

            $ionicLoading.show();

            friendsService.load().then(function () {
                $scope.friends = friendsService.friends;
                $ionicLoading.hide();
            });
        }];
    }, {}], 10: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$http", "authorizationService", "urlsApi", "usersFactory", function ($http, authorizationService, urlsApi, usersFactory) {
            function makeFriendsListFromSource(sourceArray) {
                return sourceArray.map(function (source) {
                    return usersFactory.create(source);
                });
            }

            var friends = [];

            return Object.defineProperties({

                load: function load() {
                    var data = {
                        token: authorizationService.getToken()
                    };

                    return $http.get(urlsApi.friendsList, data).then(function (response) {
                        if (response.status === 200 && response.data.friends !== undefined) {
                            friends = makeFriendsListFromSource(response.data.friends);
                        }
                    });
                }

            }, {
                friends: {
                    get: function () {
                        return friends;
                    },
                    configurable: true,
                    enumerable: true
                }
            });
        }];
    }, {}], 11: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "LoginModel", "popupService", function ($scope, $location, LoginModel, popupService) {

            $scope.model = new LoginModel();

            $scope.signIn = function () {
                $scope.model.signIn(function () {
                    $location.path("/app/main");
                }, function () {
                    popupService.alert("Something wrong!");
                });
            };

            $scope.goRegistration = function () {
                $scope.model.clear();
                $location.path("/registration");
            };

            $scope.goForgotPassword = function () {
                $scope.model.clear();
                $location.path("/forgot");
            };
        }];
    }, {}], 12: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["authorizationService", function (authorizationService) {

            var Login = function Login() {
                this.__username = this.__password = null;
            };

            Login.prototype = Object.defineProperties({

                clear: function clear() {
                    this.__username = this.__password = null;
                },

                getData: function getData() {
                    return {
                        username: this.__username,
                        password: this.__password
                    };
                },

                isFilled: function isFilled() {
                    return this.__username != null && this.__password != null;
                },

                signIn: function signIn(successCallback, errorCallback) {
                    var self = this;
                    authorizationService.login(self.getData(), function () {
                        self.clear();
                        successCallback();
                    }, errorCallback);
                }

            }, {
                username: {
                    get: function () {
                        return this.__username;
                    },
                    set: function (username) {
                        this.__username = username;
                    },
                    configurable: true,
                    enumerable: true
                },
                password: {
                    get: function () {
                        return this.__password;
                    },
                    set: function (password) {
                        this.__password = password;
                    },
                    configurable: true,
                    enumerable: true
                }
            });

            return Login;
        }];
    }, {}], 13: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "RegistrationModel", "popupService", "$ionicHistory", function ($scope, $location, RegistrationModel, popupService, $ionicHistory) {

            $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

            $scope.model = new RegistrationModel();

            $scope.register = function () {
                $scope.model.register(function () {
                    $location.path("/app/main");
                }, function () {
                    popupService.alert("Something wrong!");
                });
            };

            $scope.goBack = function () {
                $scope.model.clear();
                $ionicHistory.goBack();
            };
        }];
    }, {}], 14: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["authorizationService", function (authorizationService) {

            var Registration = function Registration() {
                this.__username = this.__email = this.__password = null;
            };

            Registration.prototype = Object.defineProperties({

                clear: function clear() {
                    this.__username = this.__email = this.__password = null;
                },

                getData: function getData() {
                    return {
                        username: this.__username,
                        email: this.__email,
                        password: this.__password
                    };
                },

                isFilled: function isFilled() {
                    return this.__username != null && this.__password != null && this.__email != null;
                },

                register: function register(successCallback, errorCallback) {
                    var self = this;
                    authorizationService.register(self.getData(), function () {
                        self.clear();
                        successCallback();
                    }, errorCallback);
                }

            }, {
                username: {
                    get: function () {
                        return this.__username;
                    },
                    set: function (username) {
                        this.__username = username;
                    },
                    configurable: true,
                    enumerable: true
                },
                email: {
                    get: function () {
                        return this.__email;
                    },
                    set: function (email) {
                        this.__email = email;
                    },
                    configurable: true,
                    enumerable: true
                },
                password: {
                    get: function () {
                        return this.__password;
                    },
                    set: function (password) {
                        this.__password = password;
                    },
                    configurable: true,
                    enumerable: true
                }
            });

            return Registration;
        }];
    }, {}], 15: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", function ($scope) {}];
    }, {}], 16: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "authorizationService", "$location", function ($scope, $translate, authorizationService, $location) {

            $scope.logout = function () {
                authorizationService.logout(function () {
                    $location.path("/login");
                });
            };
        }];
    }, {}], 17: [function (require, module, exports) {
        "use strict";

        angular.module("common", []).service("urlsApi", require("./common/urls-api-service")).service("popupService", require("./common/popup-service")).service("authorizationService", require("./common/authorization-service"));

        angular.module("users", []).factory("User", require("./common/users/user-model")).factory("usersFactory", require("./common/users/users-factory"));

        angular.module("sidebar", []).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("login", []).controller("LoginController", require("./components/login/login-controller")).factory("LoginModel", require("./components/login/login-model"));

        angular.module("forgot", []).controller("ForgotController", require("./components/forgot/forgot-controller"));

        angular.module("registration", []).controller("RegistrationController", require("./components/registration/registration-controller")).factory("RegistrationModel", require("./components/registration/registration-model"));

        angular.module("settings", []).controller("SettingsController", require("./components/settings/settings-controller"));

        angular.module("friends", []).factory("friendsService", require("./components/friends/friends-service")).controller("FriendsController", require("./components/friends/friends-controller"));

        angular.module("app", ["ionic", "ngCordova", "LocalForageModule", "pascalprecht.translate", "sidebar", "login", "registration", "forgot", "settings", "friends", "common", "users"]).config(require("./common/translate")).config(require("./common/router")).constant("$ionicLoadingConfig", {
            template: "<i class=\"icon ion-loading-c\"></i>",
            noBackdrop: true
        }).run(["$ionicPlatform", "$ionicSideMenuDelegate", function ($ionicPlatform, $ionicSideMenuDelegate) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    window.StatusBar.styleDefault();
                }

                document.addEventListener("touchstart", function (event) {
                    // workaround for Android
                    if ($ionicSideMenuDelegate.isOpenLeft()) {
                        event.preventDefault();
                    }
                });
            });
        }]).run(["$ionicPlatform", "$cordovaGlobalization", "$translate", function ($ionicPlatform, $cordovaGlobalization, $translate) {
            $ionicPlatform.ready(function () {
                $cordovaGlobalization.getPreferredLanguage().then(function (language) {
                    $translate.use(language.value.split("-")[0]);
                });
            });
        }]).run(["authorizationService", "$location", function (authorizationService, $location) {
            authorizationService.checkAuth(function () {
                $location.path("/app/main");
            }, function () {
                $location.path("/login");
            });
        }]);
    }, { "./common/authorization-service": 1, "./common/popup-service": 2, "./common/router": 3, "./common/translate": 4, "./common/urls-api-service": 5, "./common/users/user-model": 6, "./common/users/users-factory": 7, "./components/forgot/forgot-controller": 8, "./components/friends/friends-controller": 9, "./components/friends/friends-service": 10, "./components/login/login-controller": 11, "./components/login/login-model": 12, "./components/registration/registration-controller": 13, "./components/registration/registration-model": 14, "./components/settings/settings-controller": 15, "./components/sidebar/sidebar-controller": 16 }] }, {}, [17]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUFBLENBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0lBQUMsU0FBUyxFQUFFLEdBQUUsR0FBRTtRQUFDLElBQUcsQ0FBQyxFQUFFLElBQUc7WUFBQyxJQUFHLENBQUMsRUFBRSxJQUFHO2dCQUFDLElBQUksSUFBRSxPQUFPLFdBQVMsY0FBWSxRQUFRLElBQUcsQ0FBQyxLQUFHLEdBQUM7b0JBQUMsT0FBTyxFQUFFLEdBQUUsQ0FBQztpQkFBRyxJQUFHLEdBQUM7b0JBQUMsT0FBTyxFQUFFLEdBQUUsQ0FBQztpQkFBRyxNQUFNLElBQUksTUFBTSx5QkFBdUIsSUFBRTthQUFLLElBQUksSUFBRSxFQUFFLEtBQUcsRUFBQyxTQUFRLEtBQUksRUFBRSxHQUFHLEdBQUcsS0FBSyxFQUFFLFNBQVEsVUFBUyxHQUFFO2dCQUFDLElBQUksSUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHLE9BQU8sRUFBRSxJQUFFLElBQUU7ZUFBSSxHQUFFLEVBQUUsU0FBUSxHQUFFLEdBQUUsR0FBRTtTQUFHLE9BQU8sRUFBRSxHQUFHO0tBQVEsSUFBSSxJQUFFLE9BQU8sV0FBUyxjQUFZLFFBQVEsS0FBSSxJQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFJLEVBQUUsRUFBRSxJQUFJLE9BQU87R0FBSSxFQUFDLEdBQUUsQ0FBQyxVQUFTLFNBQVEsUUFBTyxTQUFRO1FBQzdiOztRQUVBLE9BQU8sNERBQXdCLFVBQVMsY0FBYyxPQUFPLFNBQVM7O1lBRWxFLElBQUksaUJBQWlCO1lBQ3JCLElBQUksUUFBUTs7WUFFWixPQUFPOztnQkFFSCxXQUFXLFNBQUEsVUFBUyxpQkFBaUIsZUFBZTtvQkFDaEQsYUFBYSxRQUFRLGdCQUFnQixLQUFLLFVBQVMsTUFBTTt3QkFDckQsUUFBUSxJQUFJO3dCQUNaLElBQUksUUFBUSxNQUFNOzRCQUNkLFFBQVE7NEJBQ1IsSUFBSSxtQkFBbUIsTUFBTTtnQ0FDekI7OytCQUVEOzRCQUNILElBQUksaUJBQWlCLE1BQU07Z0NBQ3ZCOzs7Ozs7Z0JBTWhCLFVBQVUsU0FBQSxTQUFTLE1BQU0saUJBQWlCLGVBQWU7b0JBQ3JELE1BQU0sS0FBSyxRQUFRLGNBQWMsTUFBTSxLQUFLLFVBQVMsUUFBUTt3QkFDekQsUUFBUSxJQUFJO3dCQUNaLFFBQVEsT0FBTyxLQUFLO3dCQUNwQixJQUFJLG1CQUFtQixNQUFNOzRCQUN6Qjs7dUJBRU4sU0FBTyxZQUFVO3dCQUNmLElBQUksaUJBQWlCLE1BQU07NEJBQ3ZCOzs7OztnQkFLWixPQUFPLFNBQUEsTUFBUyxNQUFNLGlCQUFpQixlQUFlO29CQUNsRCxNQUFNLEtBQUssUUFBUSxPQUFPLE1BQU0sS0FBSyxVQUFTLFFBQVE7d0JBQ2xELFFBQVEsT0FBTyxLQUFLO3dCQUNwQixhQUFhLFFBQVEsZ0JBQWdCLE9BQU8sS0FBSyxZQUFXOzRCQUN4RCxJQUFJLG1CQUFtQixNQUFNO2dDQUN6Qjs7O3VCQUdWLFNBQU8sWUFBVTt3QkFDZixJQUFJLGlCQUFpQixNQUFNOzRCQUN2Qjs7Ozs7Z0JBS1osUUFBUSxTQUFBLE9BQVMsaUJBQWlCO29CQUM5QixhQUFhLFdBQVcsZ0JBQWdCLEtBQUssWUFBVzt3QkFDcEQsUUFBUTt3QkFDUixJQUFJLG1CQUFtQixNQUFNOzRCQUN6Qjs7Ozs7Z0JBS1osZ0JBQWdCLFNBQUEsZUFBUyxNQUFNLGlCQUFpQixlQUFlO29CQUMzRCxNQUFNLElBQUksUUFBUSxRQUFRLE1BQU0sS0FBSyxZQUFXO3dCQUM1QyxJQUFJLG1CQUFtQixNQUFNOzRCQUN6Qjs7dUJBRU4sU0FBTyxZQUFXO3dCQUNoQixJQUFJLGlCQUFpQixNQUFNOzRCQUN2Qjs7Ozs7Z0JBS1osVUFBVSxTQUFBLFdBQVc7b0JBQ2pCLE9BQU87OztnQkFHWCxRQUFRLFNBQUEsU0FBVztvQkFDZixPQUFPLFNBQVM7Ozs7O09BTTFCLEtBQUksR0FBRSxDQUFDLFVBQVMsU0FBUSxRQUFPLFNBQVE7UUFDekM7O1FBRUEsT0FBTyx1Q0FBd0IsVUFBUyxhQUFhOztZQUVoRCxPQUFPOztnQkFFSCxPQUFLLENBQUEsVUFBQSxRQUFBO29CQWdCTSxJQUFJLGdCQUFnQixTQUFTLE1BQU0sSUFBSTt3QkFDbkMsT0FBTyxPQUFPLE1BQU0sTUFBTTs7O29CQUc5QixjQUFjLFdBQVcsWUFBWTt3QkFDakMsT0FBTyxPQUFPOzs7b0JBR2xCLE9BQU87bUJBeEJYLFVBQVMsTUFBTTtvQkFDbkIsSUFBSSxRQUFRLFlBQVksTUFBTTt3QkFDMUIsT0FBTzs7b0JBRVgsTUFBTSxLQUFLLFVBQVMsS0FBSzt3QkFDckIsUUFBUSxJQUFJOzs7Ozs7T0FPMUIsS0FBSSxHQUFFLENBQUMsVUFBUyxTQUFRLFFBQU8sU0FBUTtRQUN6Qzs7UUFFQSxPQUFPLGdFQUF3QixVQUFTLGdCQUFnQixvQkFBb0I7WUFDeEUsZUFFSyxNQUFNLFNBQVM7Z0JBQ1osS0FBSztnQkFDTCxhQUFhO2dCQUNiLFlBQVk7ZUFHZixNQUFNLGdCQUFnQjtnQkFDbkIsS0FBSztnQkFDTCxhQUFhO2dCQUNiLFlBQVk7ZUFHZixNQUFNLFVBQVU7Z0JBQ2IsS0FBSztnQkFDTCxhQUFhO2dCQUNiLFlBQVk7ZUFHZixNQUFNLE9BQU87Z0JBQ1YsS0FBSztnQkFDTCxVQUFVO2dCQUNWLGFBQWE7Z0JBQ2IsWUFBWTtlQUdmLE1BQU0sWUFBWTtnQkFDZixLQUFLO2dCQUNMLE9BQU87b0JBQ0gsYUFBZTt3QkFDWCxhQUFhOzs7ZUFLeEIsTUFBTSxlQUFlO2dCQUNsQixLQUFLO2dCQUNMLE9BQU87b0JBQ0gsYUFBZTt3QkFDWCxhQUFhO3dCQUNiLFlBQVk7OztlQUt2QixNQUFNLGdCQUFnQjtnQkFDbkIsS0FBSztnQkFDTCxPQUFPO29CQUNILGFBQWU7d0JBQ1gsYUFBYTt3QkFDYixZQUFZOzs7ZUFLdkIsTUFBTSxZQUFZO2dCQUNmLEtBQUs7Z0JBQ0wsT0FBTztvQkFDSCxhQUFlO3dCQUNYLGFBQWE7Ozs7Ozs7O09BUy9CLEtBQUksR0FBRSxDQUFDLFVBQVMsU0FBUSxRQUFPLFNBQVE7UUFDekM7O1FBRUEsT0FBTyw4Q0FBd0IsVUFBUyxvQkFBb0I7WUFDeEQsbUJBQW1CLGFBQWEsTUFBTTtnQkFDbEMsTUFBTTtnQkFDTixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsT0FBTztnQkFDUCxRQUFRO2dCQUNSLGNBQWM7Z0JBQ2QsUUFBUTtnQkFDUixTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsU0FBUzs7O1lBR2IsbUJBQW1CLGFBQWEsTUFBTTtnQkFDbEMsTUFBTTtnQkFDTixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsT0FBTztnQkFDUCxRQUFRO2dCQUNSLGNBQWM7Z0JBQ2QsUUFBUTtnQkFDUixTQUFTO2dCQUNULFNBQVM7Z0JBQ1QsU0FBUzs7O1lBR2IsbUJBQW1CLGtCQUFrQjtZQUNyQyxtQkFBbUIsaUJBQWlCOztPQUV0QyxLQUFJLEdBQUUsQ0FBQyxVQUFTLFNBQVEsUUFBTyxTQUFRO1FBQ3pDOztRQUVBLElBQUksV0FBVzs7UUFFZixPQUFPLHVCQUF3QixZQUFXOztZQUV0QyxPQUFPO2dCQUNILE9BQU8sV0FBVzs7Z0JBRWxCLFFBQVEsV0FBVzs7Z0JBRW5CLGNBQWMsV0FBVzs7Z0JBRXpCLFFBQVEsV0FBVzs7Z0JBRW5CLGFBQWEsV0FBVzs7O09BSTlCLEtBQUksR0FBRSxDQUFDLFVBQVMsU0FBUSxRQUFPLFNBQVE7UUFDekM7O1FBRUEsT0FBTyx1QkFBd0IsWUFBVzs7WUFFdEMsU0FBUyxLQUFLLFFBQVE7Z0JBQ2xCLEtBQUssT0FBTyxPQUFPO2dCQUNuQixLQUFLLGFBQWEsT0FBTztnQkFDekIsS0FBSyxhQUFhLE9BQU8sWUFBWTtnQkFDckMsS0FBSyxhQUFhLE9BQU8sWUFBWTtnQkFDckMsS0FBSyxhQUFhLE9BQU87OztZQUc3QixLQUFLLFlBQVMsT0FBQSxpQkFBRzs7Z0JBcUJiLFFBQVEsU0FBQSxTQUFXO29CQUNmLEtBQUssYUFBYTs7O2dCQUd0QixTQUFTLFNBQUEsVUFBVztvQkFDaEIsS0FBSyxhQUFhOztlQUV6QjtnQkEzQk8sSUFBRTtvQkFnQk0sS0FoQk4sWUFBRzt3QkFDTCxPQUFPLEtBQUs7O29CQWtCSixjQUFjO29CQUNkLFlBQVk7O2dCQWhCcEIsVUFBUTtvQkFtQkEsS0FuQkEsWUFBRzt3QkFDWCxPQUFPLEtBQUs7O29CQXFCSixjQUFjO29CQUNkLFlBQVk7O2dCQW5CcEIsVUFBUTtvQkFzQkEsS0F0QkEsWUFBRzt3QkFDWCxPQUFPLEtBQUs7O29CQXdCSixjQUFjO29CQUNkLFlBQVk7O2dCQXRCcEIsVUFBUTtvQkF5QkEsS0F6QkEsWUFBRzt3QkFDWCxPQUFPLEtBQUs7O29CQTJCSixjQUFjO29CQUNkLFlBQVk7O2dCQXpCcEIsVUFBUTtvQkE0QkEsS0E1QkEsWUFBRzt3QkFDWCxPQUFPLEtBQUs7O29CQThCSixjQUFjO29CQUNkLFlBQVk7Ozs7WUFuQjVCLE9BQU87O09BRVQsS0FBSSxHQUFFLENBQUMsVUFBUyxTQUFRLFFBQU8sU0FBUTtRQUN6Qzs7UUFFQSxPQUFPLGdDQUF3QixVQUFTLE1BQU07WUFDMUMsT0FBTztnQkFDSCxRQUFRLFNBQUEsT0FBUyxRQUFRO29CQUNyQixPQUFPLElBQUksS0FBSzs7OztPQUsxQixLQUFJLEdBQUUsQ0FBQyxVQUFTLFNBQVEsUUFBTyxTQUFRO1FBQ3pDOztRQUVBLE9BQU8sdUZBQXdCLFVBQVMsUUFBUSxXQUFXLHNCQUFzQixjQUFjOztZQUUzRixPQUFPLGVBQWU7O1lBRXRCLE9BQU8saUJBQWlCLFVBQVMsT0FBTztnQkFDcEMscUJBQXFCLGVBQWU7b0JBQ2hDLE9BQU87bUJBQ1IsWUFBVztvQkFDVixhQUFhLE1BQU07bUJBQ3BCLFlBQVc7b0JBQ1YsUUFBUSxJQUFJOzs7O09BS3RCLEtBQUksR0FBRSxDQUFDLFVBQVMsU0FBUSxRQUFPLFNBQVE7UUFDekM7O1FBRUEsT0FBTyxxRUFBd0IsVUFBUyxRQUFRLGVBQWUsZ0JBQWdCOztZQUUzRSxjQUFjOztZQUVkLGVBQWUsT0FBTyxLQUFLLFlBQU07Z0JBQzdCLE9BQU8sVUFBVSxlQUFlO2dCQUNoQyxjQUFjOzs7T0FHcEIsS0FBSSxJQUFHLENBQUMsVUFBUyxTQUFRLFFBQU8sU0FBUTtRQUMxQzs7UUFFQSxPQUFPLG9GQUF3QixVQUFTLE9BQU8sc0JBQXNCLFNBQVMsY0FBYztZQUN4RixTQUFTLDBCQUEwQixhQUFhO2dCQUM1QyxPQUFPLFlBQVksSUFBSSxVQUFBLFFBQU07b0JBc0JqQixPQXRCcUIsYUFBYSxPQUFPOzs7O1lBR3pELElBQUksVUFBVTs7WUFFZCxPQUFBLE9BQUEsaUJBQU87O2dCQUtILE1BQU0sU0FBQSxPQUFXO29CQUNiLElBQUksT0FBTzt3QkFDUCxPQUFPLHFCQUFxQjs7O29CQUdoQyxPQUFPLE1BQU0sSUFBSSxRQUFRLGFBQWEsTUFBTSxLQUFLLFVBQUEsVUFBWTt3QkFDekQsSUFBSSxTQUFTLFdBQVcsT0FBTyxTQUFTLEtBQUssWUFBWSxXQUFXOzRCQUNoRSxVQUFVLDBCQUEwQixTQUFTLEtBQUs7Ozs7O2VBS2pFO2dCQWhCTyxTQUFPO29CQXNDQyxLQXRDRCxZQUFHO3dCQUNWLE9BQU87O29CQXdDQyxjQUFjO29CQUNkLFlBQVk7Ozs7T0F4QjlCLEtBQUksSUFBRyxDQUFDLFVBQVMsU0FBUSxRQUFPLFNBQVE7UUFDMUM7O1FBRUEsT0FBTyw2RUFBd0IsVUFBUyxRQUFRLFdBQVcsWUFBWSxjQUFjOztZQUVqRixPQUFPLFFBQVEsSUFBSTs7WUFFbkIsT0FBTyxTQUFTLFlBQVc7Z0JBQ3ZCLE9BQU8sTUFBTSxPQUFPLFlBQVc7b0JBQzNCLFVBQVUsS0FBSzttQkFDaEIsWUFBVztvQkFDVixhQUFhLE1BQU07Ozs7WUFJM0IsT0FBTyxpQkFBaUIsWUFBVztnQkFDL0IsT0FBTyxNQUFNO2dCQUNiLFVBQVUsS0FBSzs7O1lBR25CLE9BQU8sbUJBQW1CLFlBQVc7Z0JBQ2pDLE9BQU8sTUFBTTtnQkFDYixVQUFVLEtBQUs7OztPQUlyQixLQUFJLElBQUcsQ0FBQyxVQUFTLFNBQVEsUUFBTyxTQUFRO1FBQzFDOztRQUVBLE9BQU8sZ0RBQXdCLFVBQVMsc0JBQXNCOztZQUUxRCxJQUFJLFFBQVEsU0FBQSxRQUFXO2dCQUNuQixLQUFLLGFBQ0wsS0FBSyxhQUFhOzs7WUFHdEIsTUFBTSxZQUFTLE9BQUEsaUJBQUc7O2dCQWtCZCxPQUFPLFNBQUEsUUFBVztvQkFDZCxLQUFLLGFBQ0wsS0FBSyxhQUFhOzs7Z0JBR3RCLFNBQVMsU0FBQSxVQUFXO29CQUNoQixPQUFPO3dCQUNILFVBQVUsS0FBSzt3QkFDZixVQUFVLEtBQUs7Ozs7Z0JBSXZCLFVBQVUsU0FBQSxXQUFXO29CQUNqQixPQUFPLEtBQUssY0FBYyxRQUFRLEtBQUssY0FBYzs7O2dCQUd6RCxRQUFRLFNBQUEsT0FBUyxpQkFBaUIsZUFBZTtvQkFDN0MsSUFBSSxPQUFPO29CQUNYLHFCQUFxQixNQUNqQixLQUFLLFdBQ0wsWUFBVzt3QkFDUCxLQUFLO3dCQUNMO3VCQUVKOzs7ZUFJWDtnQkF4Q08sVUFBUTtvQkErQ0EsS0FuREEsWUFBRzt3QkFDWCxPQUFPLEtBQUs7O29CQXFESixLQWxEQSxVQUFDLFVBQVU7d0JBQ25CLEtBQUssYUFBYTs7b0JBb0RWLGNBQWM7b0JBQ2QsWUFBWTs7Z0JBOUNwQixVQUFRO29CQWlEQSxLQXJEQSxZQUFHO3dCQUNYLE9BQU8sS0FBSzs7b0JBdURKLEtBcERBLFVBQUMsVUFBVTt3QkFDbkIsS0FBSyxhQUFhOztvQkFzRFYsY0FBYztvQkFDZCxZQUFZOzs7O1lBdEI1QixPQUFPOztPQUVULEtBQUksSUFBRyxDQUFDLFVBQVMsU0FBUSxRQUFPLFNBQVE7UUFDMUM7O1FBRUEsT0FBTyxxR0FBd0IsVUFBUyxRQUFRLFdBQVcsbUJBQW1CLGNBQWMsZUFBZTs7WUFFdkcsT0FBTyxlQUFlOztZQUV0QixPQUFPLFFBQVEsSUFBSTs7WUFFbkIsT0FBTyxXQUFXLFlBQVc7Z0JBQ3pCLE9BQU8sTUFBTSxTQUFTLFlBQVc7b0JBQzdCLFVBQVUsS0FBSzttQkFDaEIsWUFBVztvQkFDVixhQUFhLE1BQU07Ozs7WUFJM0IsT0FBTyxTQUFTLFlBQVc7Z0JBQ3ZCLE9BQU8sTUFBTTtnQkFDYixjQUFjOzs7T0FLcEIsS0FBSSxJQUFHLENBQUMsVUFBUyxTQUFRLFFBQU8sU0FBUTtRQUMxQzs7UUFFQSxPQUFPLGdEQUF3QixVQUFTLHNCQUFzQjs7WUFFMUQsSUFBSSxlQUFlLFNBQUEsZUFBVztnQkFDMUIsS0FBSyxhQUNMLEtBQUssVUFDTCxLQUFLLGFBQWE7OztZQUd0QixhQUFhLFlBQVMsT0FBQSxpQkFBRzs7Z0JBMEJyQixPQUFPLFNBQUEsUUFBVztvQkFDZCxLQUFLLGFBQ0wsS0FBSyxVQUNMLEtBQUssYUFBYTs7O2dCQUd0QixTQUFTLFNBQUEsVUFBVztvQkFDaEIsT0FBTzt3QkFDSCxVQUFVLEtBQUs7d0JBQ2YsT0FBTyxLQUFLO3dCQUNaLFVBQVUsS0FBSzs7OztnQkFJdkIsVUFBVSxTQUFBLFdBQVc7b0JBQ2pCLE9BQU8sS0FBSyxjQUFjLFFBQVEsS0FBSyxjQUFjLFFBQVEsS0FBSyxXQUFXOzs7Z0JBR2pGLFVBQVUsU0FBQSxTQUFTLGlCQUFpQixlQUFlO29CQUMvQyxJQUFJLE9BQU87b0JBQ1gscUJBQXFCLFNBQ2pCLEtBQUssV0FDTCxZQUFXO3dCQUNQLEtBQUs7d0JBQ0w7dUJBRUo7OztlQUlYO2dCQWxETyxVQUFRO29CQTRDQSxLQWhEQSxZQUFHO3dCQUNYLE9BQU8sS0FBSzs7b0JBa0RKLEtBL0NBLFVBQUMsVUFBVTt3QkFDbkIsS0FBSyxhQUFhOztvQkFpRFYsY0FBYztvQkFDZCxZQUFZOztnQkEzQ3BCLE9BQUs7b0JBOENHLEtBbERILFlBQUc7d0JBQ1IsT0FBTyxLQUFLOztvQkFvREosS0FqREgsVUFBQyxPQUFPO3dCQUNiLEtBQUssVUFBVTs7b0JBbURQLGNBQWM7b0JBQ2QsWUFBWTs7Z0JBN0NwQixVQUFRO29CQWdEQSxLQXBEQSxZQUFHO3dCQUNYLE9BQU8sS0FBSzs7b0JBc0RKLEtBbkRBLFVBQUMsVUFBVTt3QkFDbkIsS0FBSyxhQUFhOztvQkFxRFYsY0FBYztvQkFDZCxZQUFZOzs7O1lBbkI1QixPQUFPOztPQUdULEtBQUksSUFBRyxDQUFDLFVBQVMsU0FBUSxRQUFPLFNBQVE7UUFDMUM7O1FBRUEsT0FBTyxrQ0FBd0IsVUFBUyxRQUFRO09BSTlDLEtBQUksSUFBRyxDQUFDLFVBQVMsU0FBUSxRQUFPLFNBQVE7UUFDMUM7O1FBRUEsT0FBTyxxRkFBd0IsVUFBUyxRQUFRLFlBQVksc0JBQXNCLFdBQVc7O1lBRXpGLE9BQU8sU0FBUyxZQUFXO2dCQUN2QixxQkFBcUIsT0FBTyxZQUFXO29CQUNuQyxVQUFVLEtBQUs7Ozs7T0FLekIsS0FBSSxJQUFHLENBQUMsVUFBUyxTQUFRLFFBQU8sU0FBUTtRQUMxQzs7UUFFQSxRQUFRLE9BQU8sVUFBVSxJQUNwQixRQUFRLFdBQVcsUUFBUSw4QkFDM0IsUUFBUSxnQkFBZ0IsUUFBUSwyQkFDaEMsUUFBUSx3QkFBd0IsUUFBUTs7UUFHN0MsUUFBUSxPQUFPLFNBQVMsSUFDbkIsUUFBUSxRQUFRLFFBQVEsOEJBQ3hCLFFBQVEsZ0JBQWdCLFFBQVE7O1FBR3JDLFFBQVEsT0FBTyxXQUFXLElBQ3JCLFdBQVcscUJBQXFCLFFBQVE7O1FBRTdDLFFBQVEsT0FBTyxTQUFTLElBQ25CLFdBQVcsbUJBQW1CLFFBQVEsd0NBQ3RDLFFBQVEsY0FBYyxRQUFROztRQUVuQyxRQUFRLE9BQU8sVUFBVSxJQUNwQixXQUFXLG9CQUFvQixRQUFROztRQUc1QyxRQUFRLE9BQU8sZ0JBQWdCLElBQzFCLFdBQVcsMEJBQTBCLFFBQVEsc0RBQzdDLFFBQVEscUJBQXFCLFFBQVE7O1FBRTFDLFFBQVEsT0FBTyxZQUFZLElBQ3RCLFdBQVcsc0JBQXNCLFFBQVE7O1FBRTlDLFFBQVEsT0FBTyxXQUFXLElBQ3JCLFFBQVEsa0JBQWtCLFFBQVEseUNBQ2xDLFdBQVcscUJBQXFCLFFBQVE7O1FBRTdDLFFBQVEsT0FBTyxPQUFPLENBQ2QsU0FDQSxhQUNBLHFCQUNBLDBCQUNBLFdBQ0EsU0FDQSxnQkFDQSxVQUNBLFlBQ0EsV0FDQSxVQUNBLFVBR0gsT0FBTyxRQUFRLHVCQUVmLE9BQU8sUUFBUSxvQkFFZixTQUFTLHVCQUF1QjtZQUM3QixVQUFVO1lBQ1YsWUFBWTtXQUdmLGlEQUFJLFVBQVMsZ0JBQWdCLHdCQUF3QjtZQUNsRCxlQUFlLE1BQU0sWUFBVzs7O2dCQUc1QixJQUFHLE9BQU8sV0FBVyxPQUFPLFFBQVEsUUFBUSxVQUFVO29CQUNsRCxPQUFPLFFBQVEsUUFBUSxTQUFTLHlCQUF5Qjs7Z0JBRTdELElBQUcsT0FBTyxXQUFXO29CQUNqQixPQUFPLFVBQVU7OztnQkFHckIsU0FBUyxpQkFBaUIsY0FBYyxVQUFVLE9BQU87O29CQUVyRCxJQUFJLHVCQUF1QixjQUFjO3dCQUNyQyxNQUFNOzs7O1lBTXJCLDhEQUFJLFVBQVMsZ0JBQWdCLHVCQUF1QixZQUFZO1lBQzdELGVBQWUsTUFBTSxZQUFXO2dCQUM1QixzQkFBc0IsdUJBQ2pCLEtBQUssVUFBVSxVQUFVO29CQUN0QixXQUFXLElBQUssU0FBUyxNQUFPLE1BQU0sS0FBSzs7O1lBSzFELDBDQUFJLFVBQVMsc0JBQXNCLFdBQVc7WUFDM0MscUJBQXFCLFVBQVUsWUFBVztnQkFDdEMsVUFBVSxLQUFLO2VBQ2hCLFlBQVc7Z0JBQ1YsVUFBVSxLQUFLOzs7T0FLekIsRUFBQyxrQ0FBaUMsR0FBRSwwQkFBeUIsR0FBRSxtQkFBa0IsR0FBRSxzQkFBcUIsR0FBRSw2QkFBNEIsR0FBRSw2QkFBNEIsR0FBRSxnQ0FBK0IsR0FBRSx5Q0FBd0MsR0FBRSwyQ0FBMEMsR0FBRSx3Q0FBdUMsSUFBRyx1Q0FBc0MsSUFBRyxrQ0FBaUMsSUFBRyxxREFBb0QsSUFBRyxnREFBK0MsSUFBRyw2Q0FBNEMsSUFBRywyQ0FBMEMsU0FBTSxJQUFHLENBQUMsS0FBSSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjb21tb24nLCBbXSlcclxuICAgIC5zZXJ2aWNlKCd1cmxzQXBpJywgcmVxdWlyZSgnLi9jb21tb24vdXJscy1hcGktc2VydmljZScpKVxyXG4gICAgLnNlcnZpY2UoJ3BvcHVwU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL3BvcHVwLXNlcnZpY2UnKSlcclxuICAgIC5zZXJ2aWNlKCdhdXRob3JpemF0aW9uU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL2F1dGhvcml6YXRpb24tc2VydmljZScpKTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgndXNlcnMnLCBbXSlcclxuICAgIC5mYWN0b3J5KCdVc2VyJywgcmVxdWlyZSgnLi9jb21tb24vdXNlcnMvdXNlci1tb2RlbCcpKVxyXG4gICAgLmZhY3RvcnkoJ3VzZXJzRmFjdG9yeScsIHJlcXVpcmUoJy4vY29tbW9uL3VzZXJzL3VzZXJzLWZhY3RvcnknKSk7XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3NpZGViYXInLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdTaWRlYmFyQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXItY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdsb2dpbicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi1jb250cm9sbGVyJykpXHJcbiAgICAuZmFjdG9yeSgnTG9naW5Nb2RlbCcsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi1tb2RlbCcpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdmb3Jnb3QnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdGb3Jnb3RDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2ZvcmdvdC9mb3Jnb3QtY29udHJvbGxlcicpKTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncmVnaXN0cmF0aW9uJywgW10pXHJcbiAgICAuY29udHJvbGxlcignUmVnaXN0cmF0aW9uQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLWNvbnRyb2xsZXInKSlcclxuICAgIC5mYWN0b3J5KCdSZWdpc3RyYXRpb25Nb2RlbCcsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLW1vZGVsJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJywgW10pXHJcbiAgICAuY29udHJvbGxlcignU2V0dGluZ3NDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnZnJpZW5kcycsIFtdKVxyXG4gICAgLmZhY3RvcnkoJ2ZyaWVuZHNTZXJ2aWNlJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2ZyaWVuZHMvZnJpZW5kcy1zZXJ2aWNlJykpXHJcbiAgICAuY29udHJvbGxlcignRnJpZW5kc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZnJpZW5kcy9mcmllbmRzLWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xyXG4gICAgICAgICdpb25pYycsXHJcbiAgICAgICAgJ25nQ29yZG92YScsXHJcbiAgICAgICAgJ0xvY2FsRm9yYWdlTW9kdWxlJyxcclxuICAgICAgICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXHJcbiAgICAgICAgJ3NpZGViYXInLFxyXG4gICAgICAgICdsb2dpbicsXHJcbiAgICAgICAgJ3JlZ2lzdHJhdGlvbicsXHJcbiAgICAgICAgJ2ZvcmdvdCcsXHJcbiAgICAgICAgJ3NldHRpbmdzJyxcclxuICAgICAgICAnZnJpZW5kcycsXHJcbiAgICAgICAgJ2NvbW1vbicsXHJcbiAgICAgICAgJ3VzZXJzJ1xyXG4gICAgXSlcclxuXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29tbW9uL3RyYW5zbGF0ZScpKVxyXG5cclxuICAgIC5jb25maWcocmVxdWlyZSgnLi9jb21tb24vcm91dGVyJykpXHJcblxyXG4gICAgLmNvbnN0YW50KCckaW9uaWNMb2FkaW5nQ29uZmlnJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnPGkgY2xhc3M9XCJpY29uIGlvbi1sb2FkaW5nLWNcIj48L2k+JyxcclxuICAgICAgICBub0JhY2tkcm9wOiB0cnVlXHJcbiAgICB9KVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5TdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdvcmthcm91bmQgZm9yIEFuZHJvaWRcclxuICAgICAgICAgICAgICAgIGlmICgkaW9uaWNTaWRlTWVudURlbGVnYXRlLmlzT3BlbkxlZnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkY29yZG92YUdsb2JhbGl6YXRpb24sICR0cmFuc2xhdGUpIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGNvcmRvdmFHbG9iYWxpemF0aW9uLmdldFByZWZlcnJlZExhbmd1YWdlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0cmFuc2xhdGUudXNlKChsYW5ndWFnZS52YWx1ZSkuc3BsaXQoXCItXCIpWzBdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uKGF1dGhvcml6YXRpb25TZXJ2aWNlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZS5jaGVja0F1dGgoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYXBwL21haW4nKTtcclxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=