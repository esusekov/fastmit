"use strict";

module.exports = /*@ngInject*/ function(UserModel, correspondenceModel) {

    function Friend(source) {
        UserModel.call(this, source);
        this.__isOnline = source.isOnline || false;
        this.__hasUnread = source.hasUnread || false;
        this.__correspondence = new correspondenceModel();
    }

    Friend.prototype = Object.create(UserModel.prototype, {
        isOnline: {
            get: function() {
                return this.__isOnline;
            }
        },
        hasUnread: {
            get: function() {
                return this.__hasUnread;
            }
        },
        chatUrl: {
            get: function() {
                return "#/app/chat/" + this.__id;
            }
        },

        correspondence: {
            get: function() {
                return this.__correspondence;
            }
        }
    });

    var Proto = Friend.prototype;

    Proto.constructor = Friend;

    Proto.online = function() {
        this.__isOnline = true;
    };

    Proto.offline = function() {
        this.__isOnline = false;
    };

    Proto.setHasUnread = function() {
        this.__hasUnread = true;
    };

    Proto.setNoUnread = function() {
        this.__hasUnread = false;
    };

    return Friend;
};