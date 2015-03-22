"use strict";

module.exports = /*@ngInject*/ function() {
    return function(id) {
        return "#/app/chat/" + id;
    };
};