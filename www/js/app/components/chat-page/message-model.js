"use strict";

module.exports = /*@ngInject*/ function() {

    class Message {
        constructor(opts) {
            this.__time = opts.time || null;
            this.__text = opts.text;
            this.__isMy = opts.isMy;
            this.__timeout = opts.timeout || null;
        }

        getText() {
            return this.__text;
        }

        isMy() {
            return this.__isMy;
        }

        getTime() {
            return this.__time;
        }

    }

    return Message;
};
