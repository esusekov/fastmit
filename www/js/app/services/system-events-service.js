"use strict";

module.exports = /*@ngInject*/ function($document) {

    return {
        onPause(callback) {
            $document.addEventListener('pause', callback, false);
        },

        offPause(callback) {
            $document.removeEventListener('pause', callback, false);
        }

    };
};
