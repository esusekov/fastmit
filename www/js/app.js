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
            }).state("app.change_password", {
                url: "/change_password",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/change-password/change-password.html",
                        controller: "ChangePasswordController"
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

        module.exports = /*@ngInject*/["$scope", function ($scope) {}];
    }, {}], 9: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {

            var ChangePassword = function ChangePassword() {};

            ChangePassword.prototype = {};

            return new ChangePassword();
        };
    }, {}], 10: [function (require, module, exports) {
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
    }, {}], 11: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$ionicLoading", "friendsService", function ($scope, $ionicLoading, friendsService) {

            $ionicLoading.show();

            friendsService.load().then(function () {
                $scope.friends = friendsService.friends;
                $ionicLoading.hide();
            });
        }];
    }, {}], 12: [function (require, module, exports) {
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
    }, {}], 13: [function (require, module, exports) {
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
    }, {}], 14: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["authorizationService", function (authorizationService) {

            var Login = function Login() {
                this.__username = null;
                this.__password = null;
            };

            Login.prototype = Object.defineProperties({

                clear: function clear() {
                    this.__username = null;
                    this.__password = null;
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
    }, {}], 15: [function (require, module, exports) {
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
    }, {}], 16: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["authorizationService", function (authorizationService) {

            var Registration = function Registration() {
                this.__username = null;
                this.__email = null;
                this.__password = null;
            };

            Registration.prototype = Object.defineProperties({

                clear: function clear() {
                    this.__username = null;
                    this.__email = null;
                    this.__password = null;
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
    }, {}], 17: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "settingsService", function ($scope, settingsService) {

            $scope.settings = settingsService;

            $scope.changeNotification = function () {
                $scope.settings.notification = !$scope.settings.notification;
                console.log(settingsService.notification);
            };

            $scope.changeLanguage = function (lang) {
                $scope.settings.language = lang;
            };

            $scope.isRus = function () {
                return $scope.settings.language === "ru";
            };

            $scope.isEng = function () {
                return $scope.settings.language === "en";
            };
        }];
    }, {}], 18: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$cordovaGlobalization", function ($cordovaGlobalization) {

            //return $cordovaGlobalization.getPreferredLanguage()
            //    .then(language => {
            //        return {
            //            language: language,
            //            notification: true
            //        };
            //    });

            return {
                language: "ru",
                notification: true
            };
        }];
    }, {}], 19: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$localForage", "$translate", function ($localForage, $translate) {

            var SETTINGS_KEY = "SETTINGS_KEY";

            var Settings = function Settings() {
                this.__language = null;
                this.__notification = null;
            };

            Settings.prototype = Object.defineProperties({

                init: function init(description) {
                    var _this = this;

                    $localForage.getItem(SETTINGS_KEY).then(function (data) {
                        console.log(data);

                        if (data != null) {
                            _this.__setSettings(data);
                        } else {
                            _this.__setSettings(description);
                        }

                        $translate.use(_this.__language);
                    });
                },

                __setSettings: function __setSettings(data) {
                    this.__language = data.language;
                    this.__notification = data.notification;
                    this.__saveInStorage();
                },

                __compileSettingsForStorage: function __compileSettingsForStorage() {
                    return {
                        language: this.__language,
                        notification: this.__notification
                    };
                },

                __saveInStorage: function __saveInStorage() {
                    $localForage.setItem(SETTINGS_KEY, this.__compileSettingsForStorage());
                }

            }, {
                language: {
                    get: function () {
                        return this.__language;
                    },
                    set: function (value) {
                        this.__language = value;
                        this.__saveInStorage();
                        $translate.use(this.__language);
                    },
                    configurable: true,
                    enumerable: true
                },
                notification: {
                    get: function () {
                        return this.__notification;
                    },
                    set: function (value) {
                        this.__notification = value;
                        this.__saveInStorage();
                    },
                    configurable: true,
                    enumerable: true
                }
            });

            return new Settings();
        }];
    }, {}], 20: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "authorizationService", "$location", function ($scope, $translate, authorizationService, $location) {

            $scope.logout = function () {
                authorizationService.logout(function () {
                    $location.path("/login");
                });
            };
        }];
    }, {}], 21: [function (require, module, exports) {
        "use strict";

        angular.module("common", []).service("urlsApi", require("./common/urls-api-service")).service("popupService", require("./common/popup-service")).service("authorizationService", require("./common/authorization-service"));

        angular.module("users", []).factory("User", require("./common/users/user-model")).factory("usersFactory", require("./common/users/users-factory"));

        angular.module("sidebar", []).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("login", []).controller("LoginController", require("./components/login/login-controller")).factory("LoginModel", require("./components/login/login-model"));

        angular.module("forgot", []).controller("ForgotController", require("./components/forgot/forgot-controller"));

        angular.module("registration", []).controller("RegistrationController", require("./components/registration/registration-controller")).factory("RegistrationModel", require("./components/registration/registration-model"));

        angular.module("settings", []).controller("SettingsController", require("./components/settings/settings-controller")).service("settingsDescription", require("./components/settings/settings-description")).service("settingsService", require("./components/settings/settings-service"));

        angular.module("change-password", []).controller("ChangePasswordController", require("./components/change-password/change-password-controller")).service("changePasswordModel", require("./components/change-password/change-password-model"));

        angular.module("friends", []).factory("friendsService", require("./components/friends/friends-service")).controller("FriendsController", require("./components/friends/friends-controller"));

        angular.module("app", ["ionic", "ngCordova", "LocalForageModule", "pascalprecht.translate", "sidebar", "login", "registration", "forgot", "settings", "friends", "common", "users", "change-password"]).config(require("./common/translate")).config(require("./common/router")).constant("$ionicLoadingConfig", {
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
        }]).run(["$ionicPlatform", "settingsService", "settingsDescription", function ($ionicPlatform, settingsService, settingsDescription) {
            $ionicPlatform.ready(function () {

                //settingsDescription.then(description => {
                //    settingsService.init(description, settings => {
                //        console.log(settings.langua);
                //        $translate.use(settings.language);
                //    });
                //});
                console.log(settingsDescription);
                settingsService.init(settingsDescription);
            });
        }]).run(["authorizationService", "$location", function (authorizationService, $location) {
            authorizationService.checkAuth(function () {
                $location.path("/app/main");
            }, function () {
                $location.path("/login");
            });
        }]);
    }, { "./common/authorization-service": 1, "./common/popup-service": 2, "./common/router": 3, "./common/translate": 4, "./common/urls-api-service": 5, "./common/users/user-model": 6, "./common/users/users-factory": 7, "./components/change-password/change-password-controller": 8, "./components/change-password/change-password-model": 9, "./components/forgot/forgot-controller": 10, "./components/friends/friends-controller": 11, "./components/friends/friends-service": 12, "./components/login/login-controller": 13, "./components/login/login-model": 14, "./components/registration/registration-controller": 15, "./components/registration/registration-model": 16, "./components/settings/settings-controller": 17, "./components/settings/settings-description": 18, "./components/settings/settings-service": 19, "./components/sidebar/sidebar-controller": 20 }] }, {}, [21]);
//# sourceMappingURL=data:application/json;base64,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QixTQUFTLGlCQUFpQixjQUFjLFVBQVUsT0FBTzs7b0JBRXJELElBQUksdUJBQXVCLGNBQWM7d0JBQ3JDLE1BQU07Ozs7WUFNckIsaUVBQUksVUFBUyxnQkFBZ0IsaUJBQWlCLHFCQUFxQjtZQUNoRSxlQUFlLE1BQU0sWUFBVzs7Ozs7Ozs7Z0JBUTVCLFFBQVEsSUFBSTtnQkFDWixnQkFBZ0IsS0FBSzs7WUFLNUIsMENBQUksVUFBUyxzQkFBc0IsV0FBVztZQUMzQyxxQkFBcUIsVUFBVSxZQUFXO2dCQUN0QyxVQUFVLEtBQUs7ZUFDaEIsWUFBVztnQkFDVixVQUFVLEtBQUs7OztPQUt6QixFQUFDLGtDQUFpQyxHQUFFLDBCQUF5QixHQUFFLG1CQUFrQixHQUFFLHNCQUFxQixHQUFFLDZCQUE0QixHQUFFLDZCQUE0QixHQUFFLGdDQUErQixHQUFFLDJEQUEwRCxHQUFFLHNEQUFxRCxHQUFFLHlDQUF3QyxJQUFHLDJDQUEwQyxJQUFHLHdDQUF1QyxJQUFHLHVDQUFzQyxJQUFHLGtDQUFpQyxJQUFHLHFEQUFvRCxJQUFHLGdEQUErQyxJQUFHLDZDQUE0QyxJQUFHLDhDQUE2QyxJQUFHLDBDQUF5QyxJQUFHLDJDQUEwQyxTQUFNLElBQUcsQ0FBQyxLQUFJIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2NvbW1vbicsIFtdKVxyXG4gICAgLnNlcnZpY2UoJ3VybHNBcGknLCByZXF1aXJlKCcuL2NvbW1vbi91cmxzLWFwaS1zZXJ2aWNlJykpXHJcbiAgICAuc2VydmljZSgncG9wdXBTZXJ2aWNlJywgcmVxdWlyZSgnLi9jb21tb24vcG9wdXAtc2VydmljZScpKVxyXG4gICAgLnNlcnZpY2UoJ2F1dGhvcml6YXRpb25TZXJ2aWNlJywgcmVxdWlyZSgnLi9jb21tb24vYXV0aG9yaXphdGlvbi1zZXJ2aWNlJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3VzZXJzJywgW10pXHJcbiAgICAuZmFjdG9yeSgnVXNlcicsIHJlcXVpcmUoJy4vY29tbW9uL3VzZXJzL3VzZXItbW9kZWwnKSlcclxuICAgIC5mYWN0b3J5KCd1c2Vyc0ZhY3RvcnknLCByZXF1aXJlKCcuL2NvbW1vbi91c2Vycy91c2Vycy1mYWN0b3J5JykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3NpZGViYXInLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdTaWRlYmFyQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXItY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdsb2dpbicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0xvZ2luQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi1jb250cm9sbGVyJykpXHJcbiAgICAuZmFjdG9yeSgnTG9naW5Nb2RlbCcsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi1tb2RlbCcpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdmb3Jnb3QnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdGb3Jnb3RDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2ZvcmdvdC9mb3Jnb3QtY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdyZWdpc3RyYXRpb24nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tY29udHJvbGxlcicpKVxyXG4gICAgLmZhY3RvcnkoJ1JlZ2lzdHJhdGlvbk1vZGVsJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tbW9kZWwnKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdTZXR0aW5nc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtY29udHJvbGxlcicpKVxyXG4gICAgLnNlcnZpY2UoJ3NldHRpbmdzRGVzY3JpcHRpb24nLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtZGVzY3JpcHRpb24nKSlcclxuICAgIC5zZXJ2aWNlKCdzZXR0aW5nc1NlcnZpY2UnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3Mtc2VydmljZScpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjaGFuZ2UtcGFzc3dvcmQnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdDaGFuZ2VQYXNzd29yZENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvY2hhbmdlLXBhc3N3b3JkL2NoYW5nZS1wYXNzd29yZC1jb250cm9sbGVyJykpXHJcbiAgICAuc2VydmljZSgnY2hhbmdlUGFzc3dvcmRNb2RlbCcsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9jaGFuZ2UtcGFzc3dvcmQvY2hhbmdlLXBhc3N3b3JkLW1vZGVsJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdmcmllbmRzJywgW10pXHJcbiAgICAuZmFjdG9yeSgnZnJpZW5kc1NlcnZpY2UnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZnJpZW5kcy9mcmllbmRzLXNlcnZpY2UnKSlcclxuICAgIC5jb250cm9sbGVyKCdGcmllbmRzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9mcmllbmRzL2ZyaWVuZHMtY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXHJcbiAgICAgICAgJ2lvbmljJyxcclxuICAgICAgICAnbmdDb3Jkb3ZhJyxcclxuICAgICAgICAnTG9jYWxGb3JhZ2VNb2R1bGUnLFxyXG4gICAgICAgICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJyxcclxuICAgICAgICAnc2lkZWJhcicsXHJcbiAgICAgICAgJ2xvZ2luJyxcclxuICAgICAgICAncmVnaXN0cmF0aW9uJyxcclxuICAgICAgICAnZm9yZ290JyxcclxuICAgICAgICAnc2V0dGluZ3MnLFxyXG4gICAgICAgICdmcmllbmRzJyxcclxuICAgICAgICAnY29tbW9uJyxcclxuICAgICAgICAndXNlcnMnLFxyXG4gICAgICAgICdjaGFuZ2UtcGFzc3dvcmQnXHJcbiAgICBdKVxyXG5cclxuICAgIC5jb25maWcocmVxdWlyZSgnLi9jb21tb24vdHJhbnNsYXRlJykpXHJcblxyXG4gICAgLmNvbmZpZyhyZXF1aXJlKCcuL2NvbW1vbi9yb3V0ZXInKSlcclxuXHJcbiAgICAuY29uc3RhbnQoJyRpb25pY0xvYWRpbmdDb25maWcnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICc8aSBjbGFzcz1cImljb24gaW9uLWxvYWRpbmctY1wiPjwvaT4nLFxyXG4gICAgICAgIG5vQmFja2Ryb3A6IHRydWVcclxuICAgIH0pXHJcblxyXG4gICAgLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSkge1xyXG4gICAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgICAgICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LlN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gd29ya2Fyb3VuZCBmb3IgQW5kcm9pZFxyXG4gICAgICAgICAgICAgICAgaWYgKCRpb25pY1NpZGVNZW51RGVsZWdhdGUuaXNPcGVuTGVmdCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sIHNldHRpbmdzU2VydmljZSwgc2V0dGluZ3NEZXNjcmlwdGlvbikge1xyXG4gICAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgLy9zZXR0aW5nc0Rlc2NyaXB0aW9uLnRoZW4oZGVzY3JpcHRpb24gPT4ge1xyXG4gICAgICAgICAgICAvLyAgICBzZXR0aW5nc1NlcnZpY2UuaW5pdChkZXNjcmlwdGlvbiwgc2V0dGluZ3MgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgY29uc29sZS5sb2coc2V0dGluZ3MubGFuZ3VhKTtcclxuICAgICAgICAgICAgLy8gICAgICAgICR0cmFuc2xhdGUudXNlKHNldHRpbmdzLmxhbmd1YWdlKTtcclxuICAgICAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNldHRpbmdzRGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICBzZXR0aW5nc1NlcnZpY2UuaW5pdChzZXR0aW5nc0Rlc2NyaXB0aW9uKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oYXV0aG9yaXphdGlvblNlcnZpY2UsICRsb2NhdGlvbikge1xyXG4gICAgICAgIGF1dGhvcml6YXRpb25TZXJ2aWNlLmNoZWNrQXV0aChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hcHAvbWFpbicpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==