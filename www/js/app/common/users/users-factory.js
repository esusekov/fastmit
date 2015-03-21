"use strict";

module.exports = /*@ngInject*/ function(User) {
    return {
        create: function(source) {
            return new User(source);
        }
    };
};
