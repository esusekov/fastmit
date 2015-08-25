"use strict";

module.exports = /*@ngInject*/ function($document) {

    function add(type, callack) {
        $document.addEventListener(type, callback, false);
    }

    function remove(type, callback) {
        $document.removeEventListener(type, callback, false);
    }

    return {
        onPause(callback) {
            add('pause', callback);
        },

        offPause(callback) {
            remove('pause', callback);
        },

        onPesume(callback) {
            add('resume', callback);
        },

        offResume(callback) {
            remove('resume', callback);
        }
    };
};
