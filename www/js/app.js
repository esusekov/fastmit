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

        module.exports = /*@ngInject*/function () {
            return {
                restrict: "E",
                replace: true,
                templateUrl: "js/app/common/friends/friend-item.html",
                scope: {
                    friend: "="
                },
                link: function link(scope, element) {}
            };
        };
    }, {}], 3: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {

            function Friend(source) {
                this.__id = source.id;
                this.__username = source.username;
                this.__isOnline = source.isOnline || false;
                this.__isFriend = source.isFriend || true;
                this.__hasUnread = source.hasUnread || false;
                this.__photoUrl = source.photoUrl;
            }

            Friend.prototype = Object.defineProperties({

                online: function online() {
                    this.__isOnline = true;
                },

                offline: function offline() {
                    this.__isOnline = false;
                },

                setHasUnread: function setHasUnread() {
                    this.__hasUnread = true;
                },

                setNoUnread: function setNoUnread() {
                    this.__hasUnread = false;
                }
            }, {
                id: {
                    get: function () {
                        return this.__id;
                    },
                    enumerable: true,
                    configurable: true
                },
                username: {
                    get: function () {
                        return this.__username;
                    },
                    enumerable: true,
                    configurable: true
                },
                isOnline: {
                    get: function () {
                        return this.__isOnline;
                    },
                    enumerable: true,
                    configurable: true
                },
                isFriend: {
                    get: function () {
                        return this.__isFriend;
                    },
                    enumerable: true,
                    configurable: true
                },
                photoUrl: {
                    get: function () {
                        return this.__photoUrl;
                    },
                    enumerable: true,
                    configurable: true
                },
                hasUnread: {
                    get: function () {
                        return this.__hasUnread;
                    },
                    enumerable: true,
                    configurable: true
                }
            });

            return Friend;
        };
    }, {}], 4: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["FriendModel", function (FriendModel) {
            return {
                create: function create(source) {
                    return new FriendModel(source);
                }
            };
        }];
    }, {}], 5: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$http", "authorizationService", "urlsApi", "friendsFactory", function ($http, authorizationService, urlsApi, friendsFactory) {
            function makeFriendsListFromSource(sourceArray) {
                return sourceArray.map(function (source) {
                    return friendsFactory.create(source);
                });
            }

            function idCompare(a, b) {
                return a.id < b.id ? -1 : 1;
            }

            var friends = [];
            var topFriends = [];

            return Object.defineProperties({

                load: function load(sort) {
                    var data = {
                        token: authorizationService.getToken(),
                        sort: sort //id, top ...
                    };

                    return $http.get(urlsApi.friendsList, data).then(function (response) {
                        if (response.status === 200 && response.data.friends !== undefined) {
                            topFriends = makeFriendsListFromSource(response.data.friends);
                            friends = topFriends.slice().sort(idCompare);
                        }
                    });
                },

                getTopFriends: function getTopFriends(limit) {
                    return topFriends.splice(0, limit);
                }

            }, {
                friends: {
                    get: function () {
                        return friends;
                    },
                    enumerable: true,
                    configurable: true
                },
                topFriends: {
                    get: function () {
                        return topFriends;
                    },
                    enumerable: true,
                    configurable: true
                },
                onlineFriends: {
                    get: function () {
                        return friends.filter(function (item) {
                            return item.isOnline === true;
                        });
                    },
                    enumerable: true,
                    configurable: true
                }
            });
        }];
    }, {}], 6: [function (require, module, exports) {
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
    }, {}], 7: [function (require, module, exports) {
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
                        templateUrl: "js/app/components/main-page/main.html",
                        controller: "MainController"
                    }
                }
            }).state("app.friends", {
                url: "/friends",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/friends-page/friends.html",
                        controller: "FriendsController"
                    }
                }
            }).state("app.friends.all", {
                url: "/all",
                views: {
                    friendsAll: {
                        templateUrl: "js/app/components/friends-page/all-friends.html"
                    }
                }
            }).state("app.friends.online", {
                url: "/online",
                views: {
                    friendsOnline: {
                        templateUrl: "js/app/components/friends-page/online-friends.html"
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
    }, {}], 8: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$translateProvider", function ($translateProvider) {
            $translateProvider.translations("en", {
                MAIN: "Main",
                FRIENDS: "Friends",
                ALL_FRIENDS: "Friends",
                ONLINE_FRIENDS: "Online",
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
                ALL_FRIENDS: "Друзей",
                ONLINE_FRIENDS: "В сети",
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
    }, {}], 9: [function (require, module, exports) {
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
            $scope.friends = friendsService.friends;
            $scope.onlineFriends = friendsService.onlineFriends;
            $scope.friendsCount = $scope.friends.length;
            $scope.onlineFriendsCount = $scope.onlineFriends.length;
        }];
    }, {}], 12: [function (require, module, exports) {
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
    }, {}], 13: [function (require, module, exports) {
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
                    enumerable: true,
                    configurable: true
                },
                password: {
                    get: function () {
                        return this.__password;
                    },
                    set: function (password) {
                        this.__password = password;
                    },
                    enumerable: true,
                    configurable: true
                }
            });

            return Login;
        }];
    }, {}], 14: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$ionicLoading", "friendsService", function ($scope, $ionicLoading, friendsService) {
            $ionicLoading.show();

            friendsService.load("top").then(function () {
                $scope.topFriends = friendsService.getTopFriends(3);
                $ionicLoading.hide();
            });
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
                    enumerable: true,
                    configurable: true
                },
                email: {
                    get: function () {
                        return this.__email;
                    },
                    set: function (email) {
                        this.__email = email;
                    },
                    enumerable: true,
                    configurable: true
                },
                password: {
                    get: function () {
                        return this.__password;
                    },
                    set: function (password) {
                        this.__password = password;
                    },
                    enumerable: true,
                    configurable: true
                }
            });

            return Registration;
        }];
    }, {}], 17: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", function ($scope) {}];
    }, {}], 18: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "authorizationService", "$location", function ($scope, $translate, authorizationService, $location) {

            $scope.logout = function () {
                authorizationService.logout(function () {
                    $location.path("/login");
                });
            };
        }];
    }, {}], 19: [function (require, module, exports) {
        "use strict";

        var polyfills = require("./polyfills");
        polyfills.array();

        angular.module("friends", []).factory("FriendModel", require("./common/friends/friend-model")).factory("friendsFactory", require("./common/friends/friends-factory")).factory("friendsService", require("./common/friends/friends-service")).directive("friendItem", require("./common/friends/friend-item"));

        angular.module("common", ["friends"]).service("urlsApi", require("./common/urls-api-service")).service("popupService", require("./common/popup-service")).service("authorizationService", require("./common/authorization-service"));

        angular.module("sidebar", []).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("login", []).controller("LoginController", require("./components/login/login-controller")).factory("LoginModel", require("./components/login/login-model"));

        angular.module("forgot", []).controller("ForgotController", require("./components/forgot/forgot-controller"));

        angular.module("registration", []).controller("RegistrationController", require("./components/registration/registration-controller")).factory("RegistrationModel", require("./components/registration/registration-model"));

        angular.module("settings", []).controller("SettingsController", require("./components/settings/settings-controller"));

        angular.module("main-page", []).controller("MainController", require("./components/main-page/main-controller"));

        angular.module("friends-page", []).controller("FriendsController", require("./components/friends-page/friends-controller"));

        angular.module("app", ["ionic", "ngCordova", "LocalForageModule", "pascalprecht.translate", "sidebar", "login", "registration", "forgot", "settings", "main-page", "friends-page", "common"]).config(require("./common/translate")).config(require("./common/router")).constant("$ionicLoadingConfig", {
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
    }, { "./common/authorization-service": 1, "./common/friends/friend-item": 2, "./common/friends/friend-model": 3, "./common/friends/friends-factory": 4, "./common/friends/friends-service": 5, "./common/popup-service": 6, "./common/router": 7, "./common/translate": 8, "./common/urls-api-service": 9, "./components/forgot/forgot-controller": 10, "./components/friends-page/friends-controller": 11, "./components/login/login-controller": 12, "./components/login/login-model": 13, "./components/main-page/main-controller": 14, "./components/registration/registration-controller": 15, "./components/registration/registration-model": 16, "./components/settings/settings-controller": 17, "./components/sidebar/sidebar-controller": 18, "./polyfills": 20 }], 20: [function (require, module, exports) {
        "use strict";

        module.exports = {
            array: function array() {
                if (!Array.prototype.find) {
                    Array.prototype.find = function (predicate) {
                        if (!this) {
                            throw new TypeError("Array.prototype.find called on null or undefined");
                        }
                        if (typeof predicate !== "function") {
                            throw new TypeError("predicate must be a function");
                        }
                        var list = Object(this);
                        var length = list.length >>> 0;
                        var thisArg = arguments[1];
                        var value;

                        for (var i = 0; i < length; i++) {
                            value = list[i];
                            if (predicate.call(thisArg, value, i, list)) {
                                return value;
                            }
                        }
                        return undefined;
                    };
                }

                if (!Array.prototype.findIndex) {
                    Array.prototype.findIndex = function (predicate) {
                        if (!this) {
                            throw new TypeError("Array.prototype.find called on null or undefined");
                        }
                        if (typeof predicate !== "function") {
                            throw new TypeError("predicate must be a function");
                        }
                        var list = Object(this);
                        var length = list.length >>> 0;
                        var thisArg = arguments[1];
                        var value;

                        for (var i = 0; i < length; i++) {
                            value = list[i];
                            if (predicate.call(thisArg, value, i, list)) {
                                return i;
                            }
                        }
                        return -1;
                    };
                }

                return this;
            }
        };
    }, {}] }, {}, [19]);
//# sourceMappingURL=data:application/json;base64,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cHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBwb2x5ZmlsbHMgPSByZXF1aXJlKCcuL3BvbHlmaWxscycpO1xyXG5wb2x5ZmlsbHMuYXJyYXkoKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdmcmllbmRzJywgW10pXHJcbiAgICAuZmFjdG9yeSgnRnJpZW5kTW9kZWwnLCByZXF1aXJlKCcuL2NvbW1vbi9mcmllbmRzL2ZyaWVuZC1tb2RlbCcpKVxyXG4gICAgLmZhY3RvcnkoJ2ZyaWVuZHNGYWN0b3J5JywgcmVxdWlyZSgnLi9jb21tb24vZnJpZW5kcy9mcmllbmRzLWZhY3RvcnknKSlcclxuICAgIC5mYWN0b3J5KCdmcmllbmRzU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL2ZyaWVuZHMvZnJpZW5kcy1zZXJ2aWNlJykpXHJcbiAgICAuZGlyZWN0aXZlKCdmcmllbmRJdGVtJywgcmVxdWlyZSgnLi9jb21tb24vZnJpZW5kcy9mcmllbmQtaXRlbScpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjb21tb24nLCBbJ2ZyaWVuZHMnXSlcclxuICAgIC5zZXJ2aWNlKCd1cmxzQXBpJywgcmVxdWlyZSgnLi9jb21tb24vdXJscy1hcGktc2VydmljZScpKVxyXG4gICAgLnNlcnZpY2UoJ3BvcHVwU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL3BvcHVwLXNlcnZpY2UnKSlcclxuICAgIC5zZXJ2aWNlKCdhdXRob3JpemF0aW9uU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL2F1dGhvcml6YXRpb24tc2VydmljZScpKTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2lkZWJhcicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2xvZ2luJywgW10pXHJcbiAgICAuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLWNvbnRyb2xsZXInKSlcclxuICAgIC5mYWN0b3J5KCdMb2dpbk1vZGVsJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLW1vZGVsJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2ZvcmdvdCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0ZvcmdvdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZm9yZ290L2ZvcmdvdC1jb250cm9sbGVyJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdyZWdpc3RyYXRpb24nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tY29udHJvbGxlcicpKVxyXG4gICAgLmZhY3RvcnkoJ1JlZ2lzdHJhdGlvbk1vZGVsJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tbW9kZWwnKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdTZXR0aW5nc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdtYWluLXBhZ2UnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYWluLXBhZ2UvbWFpbi1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2ZyaWVuZHMtcGFnZScsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0ZyaWVuZHNDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2ZyaWVuZHMtcGFnZS9mcmllbmRzLWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xyXG4gICAgICAgICdpb25pYycsXHJcbiAgICAgICAgJ25nQ29yZG92YScsXHJcbiAgICAgICAgJ0xvY2FsRm9yYWdlTW9kdWxlJyxcclxuICAgICAgICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXHJcbiAgICAgICAgJ3NpZGViYXInLFxyXG4gICAgICAgICdsb2dpbicsXHJcbiAgICAgICAgJ3JlZ2lzdHJhdGlvbicsXHJcbiAgICAgICAgJ2ZvcmdvdCcsXHJcbiAgICAgICAgJ3NldHRpbmdzJyxcclxuICAgICAgICAnbWFpbi1wYWdlJyxcclxuICAgICAgICAnZnJpZW5kcy1wYWdlJyxcclxuICAgICAgICAnY29tbW9uJ1xyXG4gICAgXSlcclxuXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29tbW9uL3RyYW5zbGF0ZScpKVxyXG5cclxuICAgIC5jb25maWcocmVxdWlyZSgnLi9jb21tb24vcm91dGVyJykpXHJcblxyXG4gICAgLmNvbnN0YW50KCckaW9uaWNMb2FkaW5nQ29uZmlnJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnPGkgY2xhc3M9XCJpY29uIGlvbi1sb2FkaW5nLWNcIj48L2k+JyxcclxuICAgICAgICBub0JhY2tkcm9wOiB0cnVlXHJcbiAgICB9KVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5TdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdvcmthcm91bmQgZm9yIEFuZHJvaWRcclxuICAgICAgICAgICAgICAgIGlmICgkaW9uaWNTaWRlTWVudURlbGVnYXRlLmlzT3BlbkxlZnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCAkY29yZG92YUdsb2JhbGl6YXRpb24sICR0cmFuc2xhdGUpIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGNvcmRvdmFHbG9iYWxpemF0aW9uLmdldFByZWZlcnJlZExhbmd1YWdlKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChsYW5ndWFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICR0cmFuc2xhdGUudXNlKChsYW5ndWFnZS52YWx1ZSkuc3BsaXQoXCItXCIpWzBdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uKGF1dGhvcml6YXRpb25TZXJ2aWNlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZS5jaGVja0F1dGgoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYXBwL21haW4nKTtcclxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=