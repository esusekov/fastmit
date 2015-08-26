"use strict";

module.exports = /*@ngInject*/ function() {

    function add(type, callback) {
        document.addEventListener(type, callback, false);
    }

    function remove(type, callback) {
        document.removeEventListener(type, callback, false);
    }

    return {
        onPause(callback) {
            add('pause', callback);
        },

        offPause(callback) {
            remove('pause', callback);
        },

        onResume(callback) {
            add('resume', callback);
        },

        offResume(callback) {
            remove('resume', callback);
        }
    };
};
