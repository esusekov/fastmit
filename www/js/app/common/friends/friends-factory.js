"use strict";

module.exports = /*@ngInject*/ function(FriendModel) {
    return {
        create: function(source) {
            return new FriendModel(source);
        }
    };
};
