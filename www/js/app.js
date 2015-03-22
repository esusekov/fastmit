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
            return function (id) {
                return "#/app/chat/" + id;
            };
        };
    }, {}], 3: [function (require, module, exports) {
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
    }, {}], 4: [function (require, module, exports) {
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
                },

                checkId: function checkId(id) {
                    return Number(this.__id) === Number(id);
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
    }, {}], 5: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["FriendModel", function (FriendModel) {
            return {
                create: function create(source) {
                    return new FriendModel(source);
                }
            };
        }];
    }, {}], 6: [function (require, module, exports) {
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
                },

                getFriendById: function getFriendById(id) {
                    var index = friends.findIndex(function (friend) {
                        return friend.checkId(id);
                    });
                    return index !== -1 ? friends[index] : null;
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
    }, {}], 7: [function (require, module, exports) {
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
    }, {}], 8: [function (require, module, exports) {
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
            }).state("app.search", {
                url: "/search",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/search-page/search.html",
                        controller: "SearchController"
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
                url: "/chat/:id",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/chat-page/chat.html",
                        controller: "ChatController"
                    }
                }
            });

            // if none of the above states are matched, use this as the fallback
            //$urlRouterProvider.otherwise('/app/main');
        }];
    }, {}], 9: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$translateProvider", function ($translateProvider) {
            $translateProvider.translations("en", {
                MAIN: "Main",
                FRIENDS: "Friends",
                ALL_FRIENDS: "Friends",
                ONLINE_FRIENDS: "Online",
                SEARCH: "Search",
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
                SEARCH: "Поиск",
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
    }, {}], 10: [function (require, module, exports) {
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
    }, {}], 11: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$stateParams", "friendsService", function ($scope, $stateParams, friendsService) {
            $scope.id = $stateParams.id;
            $scope.friend = friendsService.getFriendById($scope.id);
        }];
    }, {}], 12: [function (require, module, exports) {
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
    }, {}], 13: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$ionicLoading", "friendsService", function ($scope, $ionicLoading, friendsService) {
            $scope.friends = friendsService.friends;
            $scope.onlineFriends = friendsService.onlineFriends;
            $scope.friendsCount = $scope.friends.length;
            $scope.onlineFriendsCount = $scope.onlineFriends.length;
        }];
    }, {}], 14: [function (require, module, exports) {
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
    }, {}], 15: [function (require, module, exports) {
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
    }, {}], 16: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$ionicLoading", "friendsService", function ($scope, $ionicLoading, friendsService) {
            $ionicLoading.show();

            friendsService.load("top").then(function () {
                $scope.topFriends = friendsService.getTopFriends(3);
                $ionicLoading.hide();
            });
        }];
    }, {}], 17: [function (require, module, exports) {
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
    }, {}], 18: [function (require, module, exports) {
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
    }, {}], 19: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "friendsService", function ($scope, friendsService) {
            $scope.friends = friendsService.friends;
        }];
    }, {}], 20: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", function ($scope) {}];
    }, {}], 21: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "authorizationService", "$location", function ($scope, $translate, authorizationService, $location) {

            $scope.logout = function () {
                authorizationService.logout(function () {
                    $location.path("/login");
                });
            };
        }];
    }, {}], 22: [function (require, module, exports) {
        "use strict";

        var polyfills = require("./polyfills");
        polyfills.array();

        angular.module("friends", []).filter("friendChatUrl", require("./common/friends/friend-chat-url")).factory("FriendModel", require("./common/friends/friend-model")).factory("friendsFactory", require("./common/friends/friends-factory")).factory("friendsService", require("./common/friends/friends-service")).directive("friendItem", require("./common/friends/friend-item"));

        angular.module("common", ["friends"]).service("urlsApi", require("./common/urls-api-service")).service("popupService", require("./common/popup-service")).service("authorizationService", require("./common/authorization-service"));

        angular.module("sidebar", []).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("login", []).controller("LoginController", require("./components/login/login-controller")).factory("LoginModel", require("./components/login/login-model"));

        angular.module("forgot", []).controller("ForgotController", require("./components/forgot/forgot-controller"));

        angular.module("registration", []).controller("RegistrationController", require("./components/registration/registration-controller")).factory("RegistrationModel", require("./components/registration/registration-model"));

        angular.module("settings", []).controller("SettingsController", require("./components/settings/settings-controller"));

        angular.module("main-page", []).controller("MainController", require("./components/main-page/main-controller"));

        angular.module("friends-page", []).controller("FriendsController", require("./components/friends-page/friends-controller"));

        angular.module("search-page", []).controller("SearchController", require("./components/search-page/search-controller"));

        angular.module("chat-page", []).controller("ChatController", require("./components/chat-page/chat-controller"));

        angular.module("app", ["ionic", "ngCordova", "LocalForageModule", "pascalprecht.translate", "sidebar", "login", "registration", "forgot", "settings", "main-page", "friends-page", "search-page", "chat-page", "common"]).config(require("./common/translate")).config(require("./common/router")).constant("$ionicLoadingConfig", {
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
    }, { "./common/authorization-service": 1, "./common/friends/friend-chat-url": 2, "./common/friends/friend-item": 3, "./common/friends/friend-model": 4, "./common/friends/friends-factory": 5, "./common/friends/friends-service": 6, "./common/popup-service": 7, "./common/router": 8, "./common/translate": 9, "./common/urls-api-service": 10, "./components/chat-page/chat-controller": 11, "./components/forgot/forgot-controller": 12, "./components/friends-page/friends-controller": 13, "./components/login/login-controller": 14, "./components/login/login-model": 15, "./components/main-page/main-controller": 16, "./components/registration/registration-controller": 17, "./components/registration/registration-model": 18, "./components/search-page/search-controller": 19, "./components/settings/settings-controller": 20, "./components/sidebar/sidebar-controller": 21, "./polyfills": 23 }], 23: [function (require, module, exports) {
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
    }, {}] }, {}, [22]);
//# sourceMappingURL=data:application/json;base64,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QUFVO1lBQ2IsT0FBTyxTQUFBLFFBQVk7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sVUFBVSxNQUFNO29CQUN2QixNQUFNLFVBQVUsT0FBTyxVQUFVLFdBQVc7d0JBQ3hDLElBQUksQ0FBQyxNQUFNOzRCQUNQLE1BQU0sSUFBSSxVQUFVOzt3QkFFeEIsSUFBSSxPQUFPLGNBQWMsWUFBWTs0QkFDakMsTUFBTSxJQUFJLFVBQVU7O3dCQUV4QixJQUFJLE9BQU8sT0FBTzt3QkFDbEIsSUFBSSxTQUFTLEtBQUssV0FBVzt3QkFDN0IsSUFBSSxVQUFVLFVBQVU7d0JBQ3hCLElBQUk7O3dCQUVKLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLEtBQUs7NEJBQzdCLFFBQVEsS0FBSzs0QkFDYixJQUFJLFVBQVUsS0FBSyxTQUFTLE9BQU8sR0FBRyxPQUFPO2dDQUN6QyxPQUFPOzs7d0JBR2YsT0FBTzs7OztnQkFJZixJQUFJLENBQUMsTUFBTSxVQUFVLFdBQVc7b0JBQzVCLE1BQU0sVUFBVSxZQUFZLFVBQVUsV0FBVzt3QkFDN0MsSUFBSSxDQUFDLE1BQU07NEJBQ1AsTUFBTSxJQUFJLFVBQVU7O3dCQUV4QixJQUFJLE9BQU8sY0FBYyxZQUFZOzRCQUNqQyxNQUFNLElBQUksVUFBVTs7d0JBRXhCLElBQUksT0FBTyxPQUFPO3dCQUNsQixJQUFJLFNBQVMsS0FBSyxXQUFXO3dCQUM3QixJQUFJLFVBQVUsVUFBVTt3QkFDeEIsSUFBSTs7d0JBRUosS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSzs0QkFDN0IsUUFBUSxLQUFLOzRCQUNiLElBQUksVUFBVSxLQUFLLFNBQVMsT0FBTyxHQUFHLE9BQU87Z0NBQ3pDLE9BQU87Ozt3QkFHZixPQUFPLENBQUM7Ozs7Z0JBSWhCLE9BQU87OztPQUliLE9BQUssSUFBRyxDQUFDLEtBQUkiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgcG9seWZpbGxzID0gcmVxdWlyZSgnLi9wb2x5ZmlsbHMnKTtcclxucG9seWZpbGxzLmFycmF5KCk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnZnJpZW5kcycsIFtdKVxyXG4gICAgLmZpbHRlcignZnJpZW5kQ2hhdFVybCcsIHJlcXVpcmUoJy4vY29tbW9uL2ZyaWVuZHMvZnJpZW5kLWNoYXQtdXJsJykpXHJcbiAgICAuZmFjdG9yeSgnRnJpZW5kTW9kZWwnLCByZXF1aXJlKCcuL2NvbW1vbi9mcmllbmRzL2ZyaWVuZC1tb2RlbCcpKVxyXG4gICAgLmZhY3RvcnkoJ2ZyaWVuZHNGYWN0b3J5JywgcmVxdWlyZSgnLi9jb21tb24vZnJpZW5kcy9mcmllbmRzLWZhY3RvcnknKSlcclxuICAgIC5mYWN0b3J5KCdmcmllbmRzU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL2ZyaWVuZHMvZnJpZW5kcy1zZXJ2aWNlJykpXHJcbiAgICAuZGlyZWN0aXZlKCdmcmllbmRJdGVtJywgcmVxdWlyZSgnLi9jb21tb24vZnJpZW5kcy9mcmllbmQtaXRlbScpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjb21tb24nLCBbJ2ZyaWVuZHMnXSlcclxuICAgIC5zZXJ2aWNlKCd1cmxzQXBpJywgcmVxdWlyZSgnLi9jb21tb24vdXJscy1hcGktc2VydmljZScpKVxyXG4gICAgLnNlcnZpY2UoJ3BvcHVwU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL3BvcHVwLXNlcnZpY2UnKSlcclxuICAgIC5zZXJ2aWNlKCdhdXRob3JpemF0aW9uU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL2F1dGhvcml6YXRpb24tc2VydmljZScpKTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2lkZWJhcicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2xvZ2luJywgW10pXHJcbiAgICAuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLWNvbnRyb2xsZXInKSlcclxuICAgIC5mYWN0b3J5KCdMb2dpbk1vZGVsJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLW1vZGVsJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2ZvcmdvdCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0ZvcmdvdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZm9yZ290L2ZvcmdvdC1jb250cm9sbGVyJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdyZWdpc3RyYXRpb24nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tY29udHJvbGxlcicpKVxyXG4gICAgLmZhY3RvcnkoJ1JlZ2lzdHJhdGlvbk1vZGVsJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3JlZ2lzdHJhdGlvbi9yZWdpc3RyYXRpb24tbW9kZWwnKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2V0dGluZ3MnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdTZXR0aW5nc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2V0dGluZ3Mvc2V0dGluZ3MtY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdtYWluLXBhZ2UnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9tYWluLXBhZ2UvbWFpbi1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2ZyaWVuZHMtcGFnZScsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0ZyaWVuZHNDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2ZyaWVuZHMtcGFnZS9mcmllbmRzLWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2VhcmNoLXBhZ2UnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdTZWFyY2hDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NlYXJjaC1wYWdlL3NlYXJjaC1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2NoYXQtcGFnZScsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0NoYXRDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2NoYXQtcGFnZS9jaGF0LWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xyXG4gICAgICAgICdpb25pYycsXHJcbiAgICAgICAgJ25nQ29yZG92YScsXHJcbiAgICAgICAgJ0xvY2FsRm9yYWdlTW9kdWxlJyxcclxuICAgICAgICAncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXHJcbiAgICAgICAgJ3NpZGViYXInLFxyXG4gICAgICAgICdsb2dpbicsXHJcbiAgICAgICAgJ3JlZ2lzdHJhdGlvbicsXHJcbiAgICAgICAgJ2ZvcmdvdCcsXHJcbiAgICAgICAgJ3NldHRpbmdzJyxcclxuICAgICAgICAnbWFpbi1wYWdlJyxcclxuICAgICAgICAnZnJpZW5kcy1wYWdlJyxcclxuICAgICAgICAnc2VhcmNoLXBhZ2UnLFxyXG4gICAgICAgICdjaGF0LXBhZ2UnLFxyXG4gICAgICAgICdjb21tb24nXHJcbiAgICBdKVxyXG5cclxuICAgIC5jb25maWcocmVxdWlyZSgnLi9jb21tb24vdHJhbnNsYXRlJykpXHJcblxyXG4gICAgLmNvbmZpZyhyZXF1aXJlKCcuL2NvbW1vbi9yb3V0ZXInKSlcclxuXHJcbiAgICAuY29uc3RhbnQoJyRpb25pY0xvYWRpbmdDb25maWcnLCB7XHJcbiAgICAgICAgdGVtcGxhdGU6ICc8aSBjbGFzcz1cImljb24gaW9uLWxvYWRpbmctY1wiPjwvaT4nLFxyXG4gICAgICAgIG5vQmFja2Ryb3A6IHRydWVcclxuICAgIH0pXHJcblxyXG4gICAgLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSkge1xyXG4gICAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgICAgICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYod2luZG93LlN0YXR1c0Jhcikge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LlN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgLy8gd29ya2Fyb3VuZCBmb3IgQW5kcm9pZFxyXG4gICAgICAgICAgICAgICAgaWYgKCRpb25pY1NpZGVNZW51RGVsZWdhdGUuaXNPcGVuTGVmdCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRjb3Jkb3ZhR2xvYmFsaXphdGlvbiwgJHRyYW5zbGF0ZSkge1xyXG4gICAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkY29yZG92YUdsb2JhbGl6YXRpb24uZ2V0UHJlZmVycmVkTGFuZ3VhZ2UoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGxhbmd1YWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHRyYW5zbGF0ZS51c2UoKGxhbmd1YWdlLnZhbHVlKS5zcGxpdChcIi1cIilbMF0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oYXV0aG9yaXphdGlvblNlcnZpY2UsICRsb2NhdGlvbikge1xyXG4gICAgICAgIGF1dGhvcml6YXRpb25TZXJ2aWNlLmNoZWNrQXV0aChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hcHAvbWFpbicpO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==