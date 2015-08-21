"use strict";

module.exports = /*ngInject*/ function() {
    return {
        decode(str) {
            return decodeURIComponent(escape(str));
        },

        encode(str) {
            return unescape(encodeURIComponent(str));
        }
    };
};
