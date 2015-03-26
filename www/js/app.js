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
                },
                hasUnread: {
                    get: function () {
                        return this.__hasUnread;
                    },
                    configurable: true,
                    enumerable: true
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
                    configurable: true,
                    enumerable: true
                },
                topFriends: {
                    get: function () {
                        return topFriends;
                    },
                    configurable: true,
                    enumerable: true
                },
                onlineFriends: {
                    get: function () {
                        return friends.filter(function (item) {
                            return item.isOnline === true;
                        });
                    },
                    configurable: true,
                    enumerable: true
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
            }).state("app.change_password", {
                url: "/change_password",
                views: {
                    menuContent: {
                        templateUrl: "js/app/components/change-password/change-password.html",
                        controller: "ChangePasswordController"
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

        module.exports = /*@ngInject*/["$scope", function ($scope) {}];
    }, {}], 12: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {

            var ChangePassword = function ChangePassword() {};

            ChangePassword.prototype = {};

            return new ChangePassword();
        };
    }, {}], 13: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$stateParams", "friendsService", function ($scope, $stateParams, friendsService) {
            $scope.id = $stateParams.id;
            $scope.friend = friendsService.getFriendById($scope.id);
        }];
    }, {}], 14: [function (require, module, exports) {
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
    }, {}], 15: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$ionicLoading", "friendsService", function ($scope, $ionicLoading, friendsService) {
            $scope.friends = friendsService.friends;
            $scope.onlineFriends = friendsService.onlineFriends;
            $scope.friendsCount = $scope.friends.length;
            $scope.onlineFriendsCount = $scope.onlineFriends.length;
        }];
    }, {}], 16: [function (require, module, exports) {
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
    }, {}], 17: [function (require, module, exports) {
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
    }, {}], 18: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$ionicLoading", "friendsService", function ($scope, $ionicLoading, friendsService) {
            $ionicLoading.show();

            friendsService.load("top").then(function () {
                $scope.topFriends = friendsService.getTopFriends(3);
                $ionicLoading.hide();
            });
        }];
    }, {}], 19: [function (require, module, exports) {
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
    }, {}], 20: [function (require, module, exports) {
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
    }, {}], 21: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "friendsService", function ($scope, friendsService) {
            $scope.friends = friendsService.friends;
        }];
    }, {}], 22: [function (require, module, exports) {
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
    }, {}], 23: [function (require, module, exports) {
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
    }, {}], 24: [function (require, module, exports) {
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
    }, {}], 25: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "authorizationService", "$location", function ($scope, $translate, authorizationService, $location) {

            $scope.logout = function () {
                authorizationService.logout(function () {
                    $location.path("/login");
                });
            };
        }];
    }, {}], 26: [function (require, module, exports) {
        "use strict";

        var polyfills = require("./polyfills");
        polyfills.array();

        angular.module("friends", []).filter("friendChatUrl", require("./common/friends/friend-chat-url")).factory("FriendModel", require("./common/friends/friend-model")).factory("friendsFactory", require("./common/friends/friends-factory")).factory("friendsService", require("./common/friends/friends-service")).directive("friendItem", require("./common/friends/friend-item"));

        angular.module("common", ["friends"]).service("urlsApi", require("./common/urls-api-service")).service("popupService", require("./common/popup-service")).service("authorizationService", require("./common/authorization-service"));

        angular.module("sidebar", []).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("login", []).controller("LoginController", require("./components/login/login-controller")).factory("LoginModel", require("./components/login/login-model"));

        angular.module("forgot", []).controller("ForgotController", require("./components/forgot/forgot-controller"));

        angular.module("registration", []).controller("RegistrationController", require("./components/registration/registration-controller")).factory("RegistrationModel", require("./components/registration/registration-model"));

        angular.module("settings", []).controller("SettingsController", require("./components/settings/settings-controller")).service("settingsDescription", require("./components/settings/settings-description")).service("settingsService", require("./components/settings/settings-service"));

        angular.module("change-password", []).controller("ChangePasswordController", require("./components/change-password/change-password-controller")).service("changePasswordModel", require("./components/change-password/change-password-model"));

        angular.module("main-page", []).controller("MainController", require("./components/main-page/main-controller"));

        angular.module("friends-page", []).controller("FriendsController", require("./components/friends-page/friends-controller"));

        angular.module("search-page", []).controller("SearchController", require("./components/search-page/search-controller"));

        angular.module("chat-page", []).controller("ChatController", require("./components/chat-page/chat-controller"));

        angular.module("app", ["ionic", "ngCordova", "LocalForageModule", "pascalprecht.translate", "sidebar", "login", "registration", "forgot", "settings", "friends", "common", "change-password", "main-page", "friends-page", "search-page", "chat-page", "common"]).config(require("./common/translate")).config(require("./common/router")).constant("$ionicLoadingConfig", {
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
    }, { "./common/authorization-service": 1, "./common/friends/friend-chat-url": 2, "./common/friends/friend-item": 3, "./common/friends/friend-model": 4, "./common/friends/friends-factory": 5, "./common/friends/friends-service": 6, "./common/popup-service": 7, "./common/router": 8, "./common/translate": 9, "./common/urls-api-service": 10, "./components/change-password/change-password-controller": 11, "./components/change-password/change-password-model": 12, "./components/chat-page/chat-controller": 13, "./components/forgot/forgot-controller": 14, "./components/friends-page/friends-controller": 15, "./components/login/login-controller": 16, "./components/login/login-model": 17, "./components/main-page/main-controller": 18, "./components/registration/registration-controller": 19, "./components/registration/registration-model": 20, "./components/search-page/search-controller": 21, "./components/settings/settings-controller": 22, "./components/settings/settings-description": 23, "./components/settings/settings-service": 24, "./components/sidebar/sidebar-controller": 25, "./polyfills": 27 }], 27: [function (require, module, exports) {
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
    }, {}] }, {}, [26]);
//# sourceMappingURL=data:application/json;base64,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TTtvQkFDdkIsTUFBTSxVQUFVLE9BQU8sVUFBVSxXQUFXO3dCQUN4QyxJQUFJLENBQUMsTUFBTTs0QkFDUCxNQUFNLElBQUksVUFBVTs7d0JBRXhCLElBQUksT0FBTyxjQUFjLFlBQVk7NEJBQ2pDLE1BQU0sSUFBSSxVQUFVOzt3QkFFeEIsSUFBSSxPQUFPLE9BQU87d0JBQ2xCLElBQUksU0FBUyxLQUFLLFdBQVc7d0JBQzdCLElBQUksVUFBVSxVQUFVO3dCQUN4QixJQUFJOzt3QkFFSixLQUFLLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxLQUFLOzRCQUM3QixRQUFRLEtBQUs7NEJBQ2IsSUFBSSxVQUFVLEtBQUssU0FBUyxPQUFPLEdBQUcsT0FBTztnQ0FDekMsT0FBTzs7O3dCQUdmLE9BQU87Ozs7Z0JBSWYsSUFBSSxDQUFDLE1BQU0sVUFBVSxXQUFXO29CQUM1QixNQUFNLFVBQVUsWUFBWSxVQUFVLFdBQVc7d0JBQzdDLElBQUksQ0FBQyxNQUFNOzRCQUNQLE1BQU0sSUFBSSxVQUFVOzt3QkFFeEIsSUFBSSxPQUFPLGNBQWMsWUFBWTs0QkFDakMsTUFBTSxJQUFJLFVBQVU7O3dCQUV4QixJQUFJLE9BQU8sT0FBTzt3QkFDbEIsSUFBSSxTQUFTLEtBQUssV0FBVzt3QkFDN0IsSUFBSSxVQUFVLFVBQVU7d0JBQ3hCLElBQUk7O3dCQUVKLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLEtBQUs7NEJBQzdCLFFBQVEsS0FBSzs0QkFDYixJQUFJLFVBQVUsS0FBSyxTQUFTLE9BQU8sR0FBRyxPQUFPO2dDQUN6QyxPQUFPOzs7d0JBR2YsT0FBTyxDQUFDOzs7O2dCQUloQixPQUFPOzs7T0FJYixPQUFLLElBQUcsQ0FBQyxLQUFJIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIHBvbHlmaWxscyA9IHJlcXVpcmUoJy4vcG9seWZpbGxzJyk7XHJcbnBvbHlmaWxscy5hcnJheSgpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2ZyaWVuZHMnLCBbXSlcclxuICAgIC5maWx0ZXIoJ2ZyaWVuZENoYXRVcmwnLCByZXF1aXJlKCcuL2NvbW1vbi9mcmllbmRzL2ZyaWVuZC1jaGF0LXVybCcpKVxyXG4gICAgLmZhY3RvcnkoJ0ZyaWVuZE1vZGVsJywgcmVxdWlyZSgnLi9jb21tb24vZnJpZW5kcy9mcmllbmQtbW9kZWwnKSlcclxuICAgIC5mYWN0b3J5KCdmcmllbmRzRmFjdG9yeScsIHJlcXVpcmUoJy4vY29tbW9uL2ZyaWVuZHMvZnJpZW5kcy1mYWN0b3J5JykpXHJcbiAgICAuZmFjdG9yeSgnZnJpZW5kc1NlcnZpY2UnLCByZXF1aXJlKCcuL2NvbW1vbi9mcmllbmRzL2ZyaWVuZHMtc2VydmljZScpKVxyXG4gICAgLmRpcmVjdGl2ZSgnZnJpZW5kSXRlbScsIHJlcXVpcmUoJy4vY29tbW9uL2ZyaWVuZHMvZnJpZW5kLWl0ZW0nKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnY29tbW9uJywgWydmcmllbmRzJ10pXHJcbiAgICAuc2VydmljZSgndXJsc0FwaScsIHJlcXVpcmUoJy4vY29tbW9uL3VybHMtYXBpLXNlcnZpY2UnKSlcclxuICAgIC5zZXJ2aWNlKCdwb3B1cFNlcnZpY2UnLCByZXF1aXJlKCcuL2NvbW1vbi9wb3B1cC1zZXJ2aWNlJykpXHJcbiAgICAuc2VydmljZSgnYXV0aG9yaXphdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL2NvbW1vbi9hdXRob3JpemF0aW9uLXNlcnZpY2UnKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnc2lkZWJhcicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2xvZ2luJywgW10pXHJcbiAgICAuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLWNvbnRyb2xsZXInKSlcclxuICAgIC5mYWN0b3J5KCdMb2dpbk1vZGVsJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2xvZ2luL2xvZ2luLW1vZGVsJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2ZvcmdvdCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0ZvcmdvdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZm9yZ290L2ZvcmdvdC1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3JlZ2lzdHJhdGlvbicsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1JlZ2lzdHJhdGlvbkNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi1jb250cm9sbGVyJykpXHJcbiAgICAuZmFjdG9yeSgnUmVnaXN0cmF0aW9uTW9kZWwnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvcmVnaXN0cmF0aW9uL3JlZ2lzdHJhdGlvbi1tb2RlbCcpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzZXR0aW5ncycsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NldHRpbmdzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1jb250cm9sbGVyJykpXHJcbiAgICAuc2VydmljZSgnc2V0dGluZ3NEZXNjcmlwdGlvbicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1kZXNjcmlwdGlvbicpKVxyXG4gICAgLnNlcnZpY2UoJ3NldHRpbmdzU2VydmljZScsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zZXR0aW5ncy9zZXR0aW5ncy1zZXJ2aWNlJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2NoYW5nZS1wYXNzd29yZCcsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ0NoYW5nZVBhc3N3b3JkQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9jaGFuZ2UtcGFzc3dvcmQvY2hhbmdlLXBhc3N3b3JkLWNvbnRyb2xsZXInKSlcclxuICAgIC5zZXJ2aWNlKCdjaGFuZ2VQYXNzd29yZE1vZGVsJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2NoYW5nZS1wYXNzd29yZC9jaGFuZ2UtcGFzc3dvcmQtbW9kZWwnKSk7XHJcblxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ21haW4tcGFnZScsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ01haW5Db250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL21haW4tcGFnZS9tYWluLWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnZnJpZW5kcy1wYWdlJywgW10pXHJcbiAgICAuY29udHJvbGxlcignRnJpZW5kc0NvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvZnJpZW5kcy1wYWdlL2ZyaWVuZHMtY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzZWFyY2gtcGFnZScsIFtdKVxyXG4gICAgLmNvbnRyb2xsZXIoJ1NlYXJjaENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2VhcmNoLXBhZ2Uvc2VhcmNoLWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnY2hhdC1wYWdlJywgW10pXHJcbiAgICAuY29udHJvbGxlcignQ2hhdENvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvY2hhdC1wYWdlL2NoYXQtY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXHJcbiAgICAgICAgJ2lvbmljJyxcclxuICAgICAgICAnbmdDb3Jkb3ZhJyxcclxuICAgICAgICAnTG9jYWxGb3JhZ2VNb2R1bGUnLFxyXG4gICAgICAgICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJyxcclxuICAgICAgICAnc2lkZWJhcicsXHJcbiAgICAgICAgJ2xvZ2luJyxcclxuICAgICAgICAncmVnaXN0cmF0aW9uJyxcclxuICAgICAgICAnZm9yZ290JyxcclxuICAgICAgICAnc2V0dGluZ3MnLFxyXG4gICAgICAgICdmcmllbmRzJyxcclxuICAgICAgICAnY29tbW9uJyxcclxuICAgICAgICAnY2hhbmdlLXBhc3N3b3JkJyxcclxuICAgICAgICAnbWFpbi1wYWdlJyxcclxuICAgICAgICAnZnJpZW5kcy1wYWdlJyxcclxuICAgICAgICAnc2VhcmNoLXBhZ2UnLFxyXG4gICAgICAgICdjaGF0LXBhZ2UnLFxyXG4gICAgICAgICdjb21tb24nXHJcblxyXG4gICAgXSlcclxuXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29tbW9uL3RyYW5zbGF0ZScpKVxyXG5cclxuICAgIC5jb25maWcocmVxdWlyZSgnLi9jb21tb24vcm91dGVyJykpXHJcblxyXG4gICAgLmNvbnN0YW50KCckaW9uaWNMb2FkaW5nQ29uZmlnJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnPGkgY2xhc3M9XCJpY29uIGlvbi1sb2FkaW5nLWNcIj48L2k+JyxcclxuICAgICAgICBub0JhY2tkcm9wOiB0cnVlXHJcbiAgICB9KVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5TdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdvcmthcm91bmQgZm9yIEFuZHJvaWRcclxuICAgICAgICAgICAgICAgIGlmICgkaW9uaWNTaWRlTWVudURlbGVnYXRlLmlzT3BlbkxlZnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCBzZXR0aW5nc1NlcnZpY2UsIHNldHRpbmdzRGVzY3JpcHRpb24pIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vc2V0dGluZ3NEZXNjcmlwdGlvbi50aGVuKGRlc2NyaXB0aW9uID0+IHtcclxuICAgICAgICAgICAgLy8gICAgc2V0dGluZ3NTZXJ2aWNlLmluaXQoZGVzY3JpcHRpb24sIHNldHRpbmdzID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKHNldHRpbmdzLmxhbmd1YSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAkdHJhbnNsYXRlLnVzZShzZXR0aW5ncy5sYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZXR0aW5nc0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgc2V0dGluZ3NTZXJ2aWNlLmluaXQoc2V0dGluZ3NEZXNjcmlwdGlvbik7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uKGF1dGhvcml6YXRpb25TZXJ2aWNlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZS5jaGVja0F1dGgoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYXBwL21haW4nKTtcclxuICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=