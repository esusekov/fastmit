"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

        module.exports = /*@ngInject*/["$localForage", "httpService", "$q", function ($localForage, httpService, $q) {
            var authorizationService = (function () {
                function authorizationService() {
                    _classCallCheck(this, authorizationService);

                    this.AUTH_TOKEN_KEY = "AUTH_TOKEN_KEY";
                    this.isAuth = false;
                }

                _createClass(authorizationService, {
                    checkAuth: {
                        value: function checkAuth() {
                            var _this = this;

                            return $localForage.getItem(this.AUTH_TOKEN_KEY).then(function (data) {
                                console.log(data);
                                if (data != null) {
                                    _this.isAuth = true;
                                    httpService.setToken(data.token);
                                } else {
                                    return $q.reject();
                                }
                            });
                        }
                    },
                    register: {
                        value: function register(data) {
                            var _this = this;

                            return httpService.register(data).then(function (result) {
                                console.log(result);
                                _this.isAuth = true;
                                var token = result.data.token;
                                httpService.setToken(token);
                                $localForage.setItem(_this.AUTH_TOKEN_KEY, token);
                            });
                        }
                    },
                    login: {
                        value: function login(data) {
                            var _this = this;

                            return httpService.login(data).then(function (result) {
                                _this.isAuth = true;
                                var token = result.data.token;
                                httpService.setToken(token);
                                $localForage.setItem(_this.AUTH_TOKEN_KEY, token);
                            });
                        }
                    },
                    logout: {
                        value: function logout() {
                            var _this = this;

                            return $localForage.removeItem(this.AUTH_TOKEN_KEY).then(function () {
                                _this.isAuth = false;
                            });
                        }
                    },
                    forgotPassword: {
                        value: function forgotPassword(data) {
                            return httpService.forgotPassword(data);
                        }
                    }
                });

                return authorizationService;
            })();

            return new authorizationService();
        }];
    }, {}], 2: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$cordovaContacts", "friendsFactory", function ($cordovaContacts, friendsFactory) {
            function makeFriendsListFromSource(sourceArray, type) {
                return sourceArray.map(function (source) {
                    return friendsFactory.create(source, type);
                });
            }

            function idCompare(a, b) {
                return a.id < b.id ? -1 : 1;
            }

            function contactToUser(data) {
                console.log(data);
                return {
                    id: data.id,
                    username: data.displayName || data.nickname,
                    photoUrl: data.photos !== null && data.photos.length > 0 ? data.photos[0].value : undefined
                };
            }

            function hasName(data) {
                return data.displayName !== null || data.nickname !== null;
            }

            var contacts = [];

            return Object.defineProperties({

                load: function load() {
                    var options = {
                        filter: "",
                        multiple: true
                    };

                    return $cordovaContacts.find(options).then(function (contactsList) {
                        console.log(contactsList);
                        contacts = makeFriendsListFromSource(contactsList.filter(hasName).map(contactToUser));
                    });
                }

            }, {
                contacts: {
                    get: function () {
                        return contacts;
                    },
                    configurable: true,
                    enumerable: true
                }
            });
        }];
    }, {}], 3: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {
            return function (id) {
                return "#/app/chat/" + id;
            };
        };
    }, {}], 4: [function (require, module, exports) {
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
    }, {}], 5: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["UserModel", "correspondenceModel", function (UserModel, correspondenceModel) {

            function Friend(source) {
                UserModel.call(this, source);
                this.__isOnline = source.isOnline || false;
                this.__hasUnread = source.hasUnread || false;
                this.__correspondence = new correspondenceModel();
            }

            Friend.prototype = Object.create(UserModel.prototype, {
                isOnline: {
                    get: function get() {
                        return this.__isOnline;
                    }
                },
                hasUnread: {
                    get: function get() {
                        return this.__hasUnread;
                    }
                },
                chatUrl: {
                    get: function get() {
                        return "#/app/chat/" + this.__id;
                    }
                },

                correspondence: {
                    get: function get() {
                        return this.__correspondence;
                    }
                }
            });

            var Proto = Friend.prototype;

            Proto.constructor = Friend;

            Proto.online = function () {
                this.__isOnline = true;
            };

            Proto.offline = function () {
                this.__isOnline = false;
            };

            Proto.setHasUnread = function () {
                this.__hasUnread = true;
            };

            Proto.setNoUnread = function () {
                this.__hasUnread = false;
            };

            return Friend;
        }];
    }, {}], 6: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["UserModel", "FriendModel", "PotentialFriendModel", function (UserModel, FriendModel, PotentialFriendModel) {
            return {
                create: function create(source, type) {
                    var friend;
                    switch (type) {
                        case "friend":
                            friend = new FriendModel(source);
                            break;
                        case "potential":
                            friend = new PotentialFriendModel(source);
                            break;
                        default:
                            friend = new UserModel(source);
                    }
                    return friend;
                }
            };
        }];
    }, {}], 7: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["httpService", "friendsFactory", function (httpService, friendsFactory) {
            function makeFriendsListFromSource(sourceArray, type) {
                return sourceArray.map(function (source) {
                    return friendsFactory.create(source, type);
                });
            }

            function idCompare(a, b) {
                return a.id < b.id ? -1 : 1;
            }

            var friends = [];
            var topFriends = [];
            var potentialFriends = [];

            return Object.defineProperties({

                load: function load(sort) {
                    var data = {
                        sort: sort //id, top ...
                    };

                    return httpService.friendsList(data).then(function (response) {
                        if (response.status === 200 && response.data.friends !== undefined) {
                            topFriends = makeFriendsListFromSource(response.data.friends, "friend");
                            friends = topFriends.slice().sort(idCompare);
                        }
                    });
                },

                loadPotentialFriends: function loadPotentialFriends() {
                    var data = {};

                    return httpService.potentialFriendsList(data).then(function (response) {
                        if (response.status === 200 && response.data.users !== undefined) {
                            potentialFriends = makeFriendsListFromSource(response.data.users, "potential");
                            console.log(potentialFriends);
                        }
                    });
                },

                getTopFriends: function getTopFriends(limit) {
                    return topFriends.splice(0, limit);
                },

                getRequesters: function getRequesters(limit) {
                    var requesters = potentialFriends.filter(function (user) {
                        return user["in"] === true;
                    });
                    return limit ? requesters.splice(0, limit) : requesters;
                },

                getDesirables: function getDesirables(limit) {
                    var desirables = potentialFriends.filter(function (user) {
                        return user.out === true;
                    });
                    return limit ? desirables.splice(0, limit) : desirables;
                },

                getFriendById: function getFriendById(id) {
                    var index = friends.findIndex(function (friend) {
                        return friend.checkId(id);
                    });
                    return index !== -1 ? friends[index] : null;
                } }, {
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
                        return friends.filter(function (friend) {
                            return friend.isOnline === true;
                        });
                    },
                    configurable: true,
                    enumerable: true
                },
                potentialFriends: {
                    get: function () {
                        return topFriends;
                    },
                    configurable: true,
                    enumerable: true
                }
            });
        }];
    }, {}], 8: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["UserModel", function (UserModel) {

            function PotentialFriend(source) {
                UserModel.call(this, source);
                this.__in = source["in"] || false;
                this.__out = source.out || false;
            }

            PotentialFriend.prototype = Object.create(UserModel.prototype, {
                "in": {
                    get: function get() {
                        return this.__in;
                    }
                },
                out: {
                    get: function get() {
                        return this.__out;
                    }
                }
            });

            var Proto = PotentialFriend.prototype;

            Proto.constructor = PotentialFriend;

            return PotentialFriend;
        }];
    }, {}], 9: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {

            function User(source) {
                this.__id = source.id;
                this.__username = source.username;
                this.__photoUrl = source.photoUrl;
            }

            User.prototype = Object.defineProperties({

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
    }, {}], 10: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$http", "urlsApi", function ($http, urlsApi) {
            var httpService = (function () {
                function httpService() {
                    _classCallCheck(this, httpService);

                    this.__token = null;
                }

                _createClass(httpService, {
                    isToken: {
                        value: function isToken() {
                            return this.__token !== null;
                        }
                    },
                    setToken: {
                        value: function setToken(token) {
                            this.__token = token;
                        }
                    },
                    getToken: {
                        value: function getToken(token) {
                            return this.__token;
                        }
                    },
                    register: {
                        value: function register(data) {
                            return $http.post(urlsApi.registration, data);
                        }
                    },
                    login: {
                        value: function login(data) {
                            return $http.post(urlsApi.login, data);
                        }
                    },
                    forgotPassword: {
                        value: function forgotPassword(data) {
                            return $http.get(urlsApi.forgot, data);
                        }
                    },
                    friendsList: {
                        value: function friendsList(data) {
                            data.token = this.__token;
                            return $http.get(urlsApi.friendsList, data);
                        }
                    },
                    potentialFriendsList: {
                        value: function potentialFriendsList(data) {
                            data.token = this.__token;
                            return $http.get(urlsApi.potentialFriendsList, data);
                        }
                    }
                });

                return httpService;
            })();

            return new httpService();
        }];
    }, {}], 11: [function (require, module, exports) {
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
    }, {}], 12: [function (require, module, exports) {
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
    }, {}], 13: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$translateProvider", function ($translateProvider) {
            $translateProvider.translations("en", {
                MAIN: "Main",
                FRIENDS: "Friends",
                ALL_FRIENDS: "Friends",
                ONLINE_FRIENDS: "Online",
                REQUESTS: "Requests",
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
                REQUESTS: "Заявки",
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
    }, {}], 14: [function (require, module, exports) {
        "use strict";

        var apiary_url = "https://private-03570-fastmitapi.apiary-mock.com/some-secret-api/";
        var main_url = "http://95.85.8.141/some-secret-api/";

        module.exports = /*@ngInject*/function () {
            var urls_api = {};

            //var urls = [
            //    'login',
            //    'logout',
            //    'registration',
            //    'forgot-password',
            //    'friends',
            //    'potential-friends'
            //];

            //    logout: main_url + '/logout',
            //
            //    registration: main_url + '/registration',
            //
            //    forgot: main_url + '/forgot-password',
            //
            //    friendsList: main_url + '/friends',
            //
            //    potentialFriendsList: main_url + '/potential-friends'
            //};

            //urls.forEach(url => {
            //    urls_api[url] = main_url + url;
            //});

            //return urls_api;

            return {
                login: main_url + "login",

                logout: main_url + "logout",

                registration: main_url + "registration",

                forgot: main_url + "forgot-password",

                friendsList: apiary_url + "friends",

                potentialFriendsList: apiary_url + "potential-friends"
            };
        };
    }, {}], 15: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", function ($scope) {}];
    }, {}], 16: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {

            var ChangePassword = function ChangePassword() {};

            ChangePassword.prototype = {};

            return new ChangePassword();
        };
    }, {}], 17: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$stateParams", "friendsService", function ($scope, $stateParams, friendsService) {
            $scope.id = $stateParams.id;
            $scope.friend = friendsService.getFriendById($scope.id);

            $scope.correspondence = $scope.friend.correspondence;

            $scope.message = null;

            $scope.sendMessage = function () {
                if ($scope.message != null) {
                    $scope.correspondence.setMyMessage({
                        text: $scope.message
                    });
                }
            };
        }];
    }, {}], 18: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["messageModel", function (messageModel) {
            var Correspondence = (function () {
                function Correspondence() {
                    _classCallCheck(this, Correspondence);

                    this.__list = [];
                }

                _createClass(Correspondence, {
                    getList: {
                        value: function getList() {
                            return this.__list;
                        }
                    },
                    setMyMessage: {
                        value: function setMyMessage(opts) {
                            opts.isMy = true;
                            var message = new messageModel(opts);
                            this.__list.push(message);
                        }
                    },
                    clear: {
                        value: function clear() {
                            this.__list = [];
                        }
                    },
                    size: {
                        value: function size() {
                            return this.__list.length;
                        }
                    },
                    isEmpty: {
                        value: function isEmpty() {
                            return this.size() === 0;
                        }
                    }
                });

                return Correspondence;
            })();

            return Correspondence;
        }];
    }, {}], 19: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {

            return {
                restrict: "E",
                replace: true,
                templateUrl: "",
                scope: {
                    message: "="
                },
                controller: function controller($scope, $element, $attrs) {},
                link: function link(scope, element, attrs) {}
            };
        };
    }, {}], 20: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {

            return {
                restrict: "E",
                replace: true,
                templateUrl: "./../templates/my-message.html",
                scope: {
                    message: "="
                },
                controller: function controller($scope, $element, $attrs) {},
                link: function link(scope, element, attrs) {}
            };
        };
    }, {}], 21: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/function () {
            var Message = (function () {
                function Message(opts) {
                    _classCallCheck(this, Message);

                    this.__time = opts.time || null;
                    this.__text = opts.text;
                    this.__isMy = opts.isMy;
                    this.__timeout = opts.timeout || null;
                }

                _createClass(Message, {
                    getText: {
                        value: function getText() {
                            return this.__text;
                        }
                    },
                    isMy: {
                        value: function isMy() {
                            return this.__isMy;
                        }
                    },
                    getTime: {
                        value: function getTime() {
                            return this.__time;
                        }
                    }
                });

                return Message;
            })();

            return Message;
        };
    }, {}], 22: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "authorizationService", "popupService", function ($scope, $location, authorizationService, popupService) {

            $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

            $scope.forgotPassword = function (email) {
                authorizationService.forgotPassword({
                    email: email
                }).then(function () {
                    popupService.alert("New password sent to your specified mailbox");
                })["catch"](function () {
                    console.log("Fail");
                });
            };
        }];
    }, {}], 23: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$ionicLoading", "friendsService", function ($scope, $ionicLoading, friendsService) {
            $scope.friends = friendsService.friends;
            $scope.onlineFriends = friendsService.onlineFriends;
            $scope.requestingFriends = friendsService.getRequesters();
            $scope.desirableFriends = friendsService.getDesirables();
            $scope.friendsCount = $scope.friends.length;
            $scope.onlineFriendsCount = $scope.onlineFriends.length;
        }];
    }, {}], 24: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "LoginModel", "popupService", function ($scope, $location, LoginModel, popupService) {

            $scope.model = new LoginModel();

            $scope.signIn = function () {
                $scope.model.signIn().then(function () {
                    $location.path("/app/main");
                })["catch"](function () {
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
    }, {}], 25: [function (require, module, exports) {
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

                signIn: function signIn() {
                    return authorizationService.login(this.getData());
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
    }, {}], 26: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$q", "$window", "$ionicLoading", "friendsService", function ($scope, $q, $window, $ionicLoading, friendsService) {
            $ionicLoading.show();

            $q.all([friendsService.load("top"), friendsService.loadPotentialFriends()]).then(function () {
                $scope.topFriends = friendsService.getTopFriends(3);
                $scope.requestingFriends = friendsService.getRequesters(3);
                $ionicLoading.hide();
            });

            $scope.openExternal = function () {
                $window.open("http://lenta.ru", "_self");
            };
        }];
    }, {}], 27: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$location", "RegistrationModel", "popupService", "$ionicHistory", function ($scope, $location, RegistrationModel, popupService, $ionicHistory) {

            $scope.emailPattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

            $scope.model = new RegistrationModel();

            $scope.register = function () {
                $scope.model.register().then(function () {
                    $location.path("/app/main");
                })["catch"](function () {
                    popupService.alert("Something wrong!");
                });
            };

            $scope.goBack = function () {
                $scope.model.clear();
                $ionicHistory.goBack();
            };
        }];
    }, {}], 28: [function (require, module, exports) {
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
                    return authorizationService.register(this.getData());
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
    }, {}], 29: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "contactsService", "friendsService", function ($scope, contactsService, friendsService) {
            $scope.friends = friendsService.friends;
            $scope.filteredFriends = [];

            $scope.$watch("query.username", function (value) {
                if (value === undefined || value === "") {
                    $scope.filteredFriends = [];
                    return;
                }

                var lowercasedValue = value.toLowerCase();

                $scope.filteredFriends = $scope.friends.filter(function (friend) {
                    return friend.username.toLowerCase().indexOf(lowercasedValue) >= 0;
                });
            });

            //contactsService.load().then(function() {
            //    console.log(contactsService.contacts);
            //});
        }];
    }, {}], 30: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "settingsService", function ($scope, settingsService) {

            $scope.settings = settingsService;

            $scope.changeNotification = function () {
                $scope.settings.changeNotification();
            };

            $scope.changeLanguage = function (lang) {
                $scope.settings.changeLanguage(lang);
            };

            $scope.isRus = function () {
                return $scope.settings.language === "ru";
            };

            $scope.isEng = function () {
                return $scope.settings.language === "en";
            };
        }];
    }, {}], 31: [function (require, module, exports) {
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
    }, {}], 32: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$localForage", "$translate", function ($localForage, $translate) {

            var SETTINGS_KEY = "SETTINGS_KEY";

            var Settings = function Settings() {
                this.__language = null;
                this.__notification = null;
            };

            Settings.prototype = Object.defineProperties({

                changeNotification: function changeNotification() {
                    this.notification = !this.notification;
                },

                changeLanguage: function changeLanguage(lang) {
                    this.language = lang;
                },

                init: function init(description) {
                    var _this = this;

                    $localForage.getItem(SETTINGS_KEY).then(function (data) {
                        console.log(data);

                        if (data != null) {
                            _this.setSettings(data);
                        } else {
                            _this.setSettings(description);
                        }

                        $translate.use(_this.__language);
                    });
                },

                setSettings: function setSettings(data) {
                    this.__language = data.language;
                    this.__notification = data.notification;
                    this.saveInStorage();
                },

                compileSettingsForStorage: function compileSettingsForStorage() {
                    return {
                        language: this.__language,
                        notification: this.__notification
                    };
                },

                saveInStorage: function saveInStorage() {
                    $localForage.setItem(SETTINGS_KEY, this.compileSettingsForStorage());
                }

            }, {
                language: {
                    get: function () {
                        return this.__language;
                    },
                    set: function (value) {
                        this.__language = value;
                        this.saveInStorage();
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
                        this.saveInStorage();
                    },
                    configurable: true,
                    enumerable: true
                }
            });

            return new Settings();
        }];
    }, {}], 33: [function (require, module, exports) {
        "use strict";

        module.exports = /*@ngInject*/["$scope", "$translate", "authorizationService", "$location", function ($scope, $translate, authorizationService, $location) {

            $scope.logout = function () {
                authorizationService.logout().then(function () {
                    $location.path("/login");
                });
            };
        }];
    }, {}], 34: [function (require, module, exports) {
        "use strict";

        var polyfills = require("./polyfills");
        polyfills.array();

        angular.module("friends", []).filter("friendChatUrl", require("./common/friends/friend-chat-url")).factory("UserModel", require("./common/friends/user-model")).factory("FriendModel", require("./common/friends/friend-model")).factory("PotentialFriendModel", require("./common/friends/potential-friend-model")).factory("friendsFactory", require("./common/friends/friends-factory")).factory("friendsService", require("./common/friends/friends-service")).factory("contactsService", require("./common/friends/contacts-service")).directive("friendItem", require("./common/friends/friend-item"));

        angular.module("common", ["friends"]).service("urlsApi", require("./common/urls-api-service")).service("popupService", require("./common/popup-service")).factory("httpService", require("./common/httpService")).service("authorizationService", require("./common/authorization-service"));

        angular.module("sidebar", []).controller("SidebarController", require("./components/sidebar/sidebar-controller"));

        angular.module("login", []).controller("LoginController", require("./components/login/login-controller")).factory("LoginModel", require("./components/login/login-model"));

        angular.module("forgot", []).controller("ForgotController", require("./components/forgot/forgot-controller"));

        angular.module("registration", []).controller("RegistrationController", require("./components/registration/registration-controller")).factory("RegistrationModel", require("./components/registration/registration-model"));

        angular.module("settings", []).controller("SettingsController", require("./components/settings/settings-controller")).service("settingsDescription", require("./components/settings/settings-description")).service("settingsService", require("./components/settings/settings-service"));

        angular.module("change-password", []).controller("ChangePasswordController", require("./components/change-password/change-password-controller")).service("changePasswordModel", require("./components/change-password/change-password-model"));

        angular.module("main-page", []).controller("MainController", require("./components/main-page/main-controller"));

        angular.module("friends-page", []).controller("FriendsController", require("./components/friends-page/friends-controller"));

        angular.module("search-page", []).controller("SearchController", require("./components/search-page/search-controller"));

        angular.module("chat-page", []).controller("ChatController", require("./components/chat-page/chat-controller")).factory("correspondenceModel", require("./components/chat-page/correspondence-model")).factory("messageModel", require("./components/chat-page/message-model")).directive("myMessage", require("./components/chat-page/directives/my-message")).directive("companionMessage", require("./components/chat-page/directives/companion-message"));

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
            authorizationService.checkAuth().then(function () {
                $location.path("/app/main");
            })["catch"](function () {
                $location.path("/login");
            });
        }]);
    }, { "./common/authorization-service": 1, "./common/friends/contacts-service": 2, "./common/friends/friend-chat-url": 3, "./common/friends/friend-item": 4, "./common/friends/friend-model": 5, "./common/friends/friends-factory": 6, "./common/friends/friends-service": 7, "./common/friends/potential-friend-model": 8, "./common/friends/user-model": 9, "./common/httpService": 10, "./common/popup-service": 11, "./common/router": 12, "./common/translate": 13, "./common/urls-api-service": 14, "./components/change-password/change-password-controller": 15, "./components/change-password/change-password-model": 16, "./components/chat-page/chat-controller": 17, "./components/chat-page/correspondence-model": 18, "./components/chat-page/directives/companion-message": 19, "./components/chat-page/directives/my-message": 20, "./components/chat-page/message-model": 21, "./components/forgot/forgot-controller": 22, "./components/friends-page/friends-controller": 23, "./components/login/login-controller": 24, "./components/login/login-model": 25, "./components/main-page/main-controller": 26, "./components/registration/registration-controller": 27, "./components/registration/registration-model": 28, "./components/search-page/search-controller": 29, "./components/settings/settings-controller": 30, "./components/settings/settings-description": 31, "./components/settings/settings-service": 32, "./components/sidebar/sidebar-controller": 33, "./polyfills": 35 }], 35: [function (require, module, exports) {
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
    }, {}] }, {}, [34]);

//filterFriendsByUsername: function(username) {
//    return friends.filter(function(friend) {
//        return friend.username.indexOf(username) !== -1;
//    });
//}
//# sourceMappingURL=data:application/json;base64,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QU8sVUFBVSxXQUFXO3dCQUN4QyxJQUFJLENBQUMsTUFBTTs0QkFDUCxNQUFNLElBQUksVUFBVTs7d0JBRXhCLElBQUksT0FBTyxjQUFjLFlBQVk7NEJBQ2pDLE1BQU0sSUFBSSxVQUFVOzt3QkFFeEIsSUFBSSxPQUFPLE9BQU87d0JBQ2xCLElBQUksU0FBUyxLQUFLLFdBQVc7d0JBQzdCLElBQUksVUFBVSxVQUFVO3dCQUN4QixJQUFJOzt3QkFFSixLQUFLLElBQUksSUFBSSxHQUFHLElBQUksUUFBUSxLQUFLOzRCQUM3QixRQUFRLEtBQUs7NEJBQ2IsSUFBSSxVQUFVLEtBQUssU0FBUyxPQUFPLEdBQUcsT0FBTztnQ0FDekMsT0FBTzs7O3dCQUdmLE9BQU87Ozs7Z0JBSWYsSUFBSSxDQUFDLE1BQU0sVUFBVSxXQUFXO29CQUM1QixNQUFNLFVBQVUsWUFBWSxVQUFVLFdBQVc7d0JBQzdDLElBQUksQ0FBQyxNQUFNOzRCQUNQLE1BQU0sSUFBSSxVQUFVOzt3QkFFeEIsSUFBSSxPQUFPLGNBQWMsWUFBWTs0QkFDakMsTUFBTSxJQUFJLFVBQVU7O3dCQUV4QixJQUFJLE9BQU8sT0FBTzt3QkFDbEIsSUFBSSxTQUFTLEtBQUssV0FBVzt3QkFDN0IsSUFBSSxVQUFVLFVBQVU7d0JBQ3hCLElBQUk7O3dCQUVKLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLEtBQUs7NEJBQzdCLFFBQVEsS0FBSzs0QkFDYixJQUFJLFVBQVUsS0FBSyxTQUFTLE9BQU8sR0FBRyxPQUFPO2dDQUN6QyxPQUFPOzs7d0JBR2YsT0FBTyxDQUFDOzs7O2dCQUloQixPQUFPOzs7T0FJYixPQUFLLElBQUcsQ0FBQzs7Ozs7O0dBSlIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgcG9seWZpbGxzID0gcmVxdWlyZSgnLi9wb2x5ZmlsbHMnKTtcclxucG9seWZpbGxzLmFycmF5KCk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnZnJpZW5kcycsIFtdKVxyXG4gICAgLmZpbHRlcignZnJpZW5kQ2hhdFVybCcsIHJlcXVpcmUoJy4vY29tbW9uL2ZyaWVuZHMvZnJpZW5kLWNoYXQtdXJsJykpXHJcbiAgICAuZmFjdG9yeSgnVXNlck1vZGVsJywgcmVxdWlyZSgnLi9jb21tb24vZnJpZW5kcy91c2VyLW1vZGVsJykpXHJcbiAgICAuZmFjdG9yeSgnRnJpZW5kTW9kZWwnLCByZXF1aXJlKCcuL2NvbW1vbi9mcmllbmRzL2ZyaWVuZC1tb2RlbCcpKVxyXG4gICAgLmZhY3RvcnkoJ1BvdGVudGlhbEZyaWVuZE1vZGVsJywgcmVxdWlyZSgnLi9jb21tb24vZnJpZW5kcy9wb3RlbnRpYWwtZnJpZW5kLW1vZGVsJykpXHJcbiAgICAuZmFjdG9yeSgnZnJpZW5kc0ZhY3RvcnknLCByZXF1aXJlKCcuL2NvbW1vbi9mcmllbmRzL2ZyaWVuZHMtZmFjdG9yeScpKVxyXG4gICAgLmZhY3RvcnkoJ2ZyaWVuZHNTZXJ2aWNlJywgcmVxdWlyZSgnLi9jb21tb24vZnJpZW5kcy9mcmllbmRzLXNlcnZpY2UnKSlcclxuICAgIC5mYWN0b3J5KCdjb250YWN0c1NlcnZpY2UnLCByZXF1aXJlKCcuL2NvbW1vbi9mcmllbmRzL2NvbnRhY3RzLXNlcnZpY2UnKSlcclxuICAgIC5kaXJlY3RpdmUoJ2ZyaWVuZEl0ZW0nLCByZXF1aXJlKCcuL2NvbW1vbi9mcmllbmRzL2ZyaWVuZC1pdGVtJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2NvbW1vbicsIFsnZnJpZW5kcyddKVxyXG4gICAgLnNlcnZpY2UoJ3VybHNBcGknLCByZXF1aXJlKCcuL2NvbW1vbi91cmxzLWFwaS1zZXJ2aWNlJykpXHJcbiAgICAuc2VydmljZSgncG9wdXBTZXJ2aWNlJywgcmVxdWlyZSgnLi9jb21tb24vcG9wdXAtc2VydmljZScpKVxyXG4gICAgLmZhY3RvcnkoJ2h0dHBTZXJ2aWNlJywgcmVxdWlyZSgnLi9jb21tb24vaHR0cFNlcnZpY2UnKSlcclxuICAgIC5zZXJ2aWNlKCdhdXRob3JpemF0aW9uU2VydmljZScsIHJlcXVpcmUoJy4vY29tbW9uL2F1dGhvcml6YXRpb24tc2VydmljZScpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdzaWRlYmFyJywgW10pXHJcbiAgICAuY29udHJvbGxlcignU2lkZWJhckNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbG9naW4nLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9naW4vbG9naW4tY29udHJvbGxlcicpKVxyXG4gICAgLmZhY3RvcnkoJ0xvZ2luTW9kZWwnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvbG9naW4vbG9naW4tbW9kZWwnKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnZm9yZ290JywgW10pXHJcbiAgICAuY29udHJvbGxlcignRm9yZ290Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9mb3Jnb3QvZm9yZ290LWNvbnRyb2xsZXInKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgncmVnaXN0cmF0aW9uJywgW10pXHJcbiAgICAuY29udHJvbGxlcignUmVnaXN0cmF0aW9uQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLWNvbnRyb2xsZXInKSlcclxuICAgIC5mYWN0b3J5KCdSZWdpc3RyYXRpb25Nb2RlbCcsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9yZWdpc3RyYXRpb24vcmVnaXN0cmF0aW9uLW1vZGVsJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3NldHRpbmdzJywgW10pXHJcbiAgICAuY29udHJvbGxlcignU2V0dGluZ3NDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWNvbnRyb2xsZXInKSlcclxuICAgIC5zZXJ2aWNlKCdzZXR0aW5nc0Rlc2NyaXB0aW9uJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLWRlc2NyaXB0aW9uJykpXHJcbiAgICAuc2VydmljZSgnc2V0dGluZ3NTZXJ2aWNlJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL3NldHRpbmdzL3NldHRpbmdzLXNlcnZpY2UnKSk7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnY2hhbmdlLXBhc3N3b3JkJywgW10pXHJcbiAgICAuY29udHJvbGxlcignQ2hhbmdlUGFzc3dvcmRDb250cm9sbGVyJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2NoYW5nZS1wYXNzd29yZC9jaGFuZ2UtcGFzc3dvcmQtY29udHJvbGxlcicpKVxyXG4gICAgLnNlcnZpY2UoJ2NoYW5nZVBhc3N3b3JkTW9kZWwnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvY2hhbmdlLXBhc3N3b3JkL2NoYW5nZS1wYXNzd29yZC1tb2RlbCcpKTtcclxuXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbWFpbi1wYWdlJywgW10pXHJcbiAgICAuY29udHJvbGxlcignTWFpbkNvbnRyb2xsZXInLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvbWFpbi1wYWdlL21haW4tY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdmcmllbmRzLXBhZ2UnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdGcmllbmRzQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9mcmllbmRzLXBhZ2UvZnJpZW5kcy1jb250cm9sbGVyJykpO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ3NlYXJjaC1wYWdlJywgW10pXHJcbiAgICAuY29udHJvbGxlcignU2VhcmNoQ29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9zZWFyY2gtcGFnZS9zZWFyY2gtY29udHJvbGxlcicpKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjaGF0LXBhZ2UnLCBbXSlcclxuICAgIC5jb250cm9sbGVyKCdDaGF0Q29udHJvbGxlcicsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9jaGF0LXBhZ2UvY2hhdC1jb250cm9sbGVyJykpXHJcbiAgICAuZmFjdG9yeSgnY29ycmVzcG9uZGVuY2VNb2RlbCcsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9jaGF0LXBhZ2UvY29ycmVzcG9uZGVuY2UtbW9kZWwnKSlcclxuICAgIC5mYWN0b3J5KCdtZXNzYWdlTW9kZWwnLCByZXF1aXJlKCcuL2NvbXBvbmVudHMvY2hhdC1wYWdlL21lc3NhZ2UtbW9kZWwnKSlcclxuICAgIC5kaXJlY3RpdmUoJ215TWVzc2FnZScsIHJlcXVpcmUoJy4vY29tcG9uZW50cy9jaGF0LXBhZ2UvZGlyZWN0aXZlcy9teS1tZXNzYWdlJykpXHJcbiAgICAuZGlyZWN0aXZlKCdjb21wYW5pb25NZXNzYWdlJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL2NoYXQtcGFnZS9kaXJlY3RpdmVzL2NvbXBhbmlvbi1tZXNzYWdlJykpO1xyXG5cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXHJcbiAgICAgICAgJ2lvbmljJyxcclxuICAgICAgICAnbmdDb3Jkb3ZhJyxcclxuICAgICAgICAnTG9jYWxGb3JhZ2VNb2R1bGUnLFxyXG4gICAgICAgICdwYXNjYWxwcmVjaHQudHJhbnNsYXRlJyxcclxuICAgICAgICAnc2lkZWJhcicsXHJcbiAgICAgICAgJ2xvZ2luJyxcclxuICAgICAgICAncmVnaXN0cmF0aW9uJyxcclxuICAgICAgICAnZm9yZ290JyxcclxuICAgICAgICAnc2V0dGluZ3MnLFxyXG4gICAgICAgICdmcmllbmRzJyxcclxuICAgICAgICAnY29tbW9uJyxcclxuICAgICAgICAnY2hhbmdlLXBhc3N3b3JkJyxcclxuICAgICAgICAnbWFpbi1wYWdlJyxcclxuICAgICAgICAnZnJpZW5kcy1wYWdlJyxcclxuICAgICAgICAnc2VhcmNoLXBhZ2UnLFxyXG4gICAgICAgICdjaGF0LXBhZ2UnLFxyXG4gICAgICAgICdjb21tb24nXHJcblxyXG4gICAgXSlcclxuXHJcbiAgICAuY29uZmlnKHJlcXVpcmUoJy4vY29tbW9uL3RyYW5zbGF0ZScpKVxyXG5cclxuICAgIC5jb25maWcocmVxdWlyZSgnLi9jb21tb24vcm91dGVyJykpXHJcblxyXG4gICAgLmNvbnN0YW50KCckaW9uaWNMb2FkaW5nQ29uZmlnJywge1xyXG4gICAgICAgIHRlbXBsYXRlOiAnPGkgY2xhc3M9XCJpY29uIGlvbi1sb2FkaW5nLWNcIj48L2k+JyxcclxuICAgICAgICBub0JhY2tkcm9wOiB0cnVlXHJcbiAgICB9KVxyXG5cclxuICAgIC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0sICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxyXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5TdGF0dXNCYXIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5TdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHdvcmthcm91bmQgZm9yIEFuZHJvaWRcclxuICAgICAgICAgICAgICAgIGlmICgkaW9uaWNTaWRlTWVudURlbGVnYXRlLmlzT3BlbkxlZnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtLCBzZXR0aW5nc1NlcnZpY2UsIHNldHRpbmdzRGVzY3JpcHRpb24pIHtcclxuICAgICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIC8vc2V0dGluZ3NEZXNjcmlwdGlvbi50aGVuKGRlc2NyaXB0aW9uID0+IHtcclxuICAgICAgICAgICAgLy8gICAgc2V0dGluZ3NTZXJ2aWNlLmluaXQoZGVzY3JpcHRpb24sIHNldHRpbmdzID0+IHtcclxuICAgICAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKHNldHRpbmdzLmxhbmd1YSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAkdHJhbnNsYXRlLnVzZShzZXR0aW5ncy5sYW5ndWFnZSk7XHJcbiAgICAgICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgICAgICAvL30pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZXR0aW5nc0Rlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgc2V0dGluZ3NTZXJ2aWNlLmluaXQoc2V0dGluZ3NEZXNjcmlwdGlvbik7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICAucnVuKGZ1bmN0aW9uKGF1dGhvcml6YXRpb25TZXJ2aWNlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZS5jaGVja0F1dGgoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hcHAvbWFpbicpO1xyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=