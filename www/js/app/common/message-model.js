"use strict";

module.exports = /*@ngInject*/ function() {

    class Message {
        constructor(opts) {
            this.__id = opts.id || null;
            this.__time = opts.time || null;
            this.__text = opts.text;
            this.__isMy = opts.isMy;
            this.__timeout = opts.timeout || null;

            this.__isSent = false;
            this.__isRead = false;
        }

        set isSent(isSent) {
            this.__isSent = isSent;
        }

        get isSent() {
            return this.__isSent;
        }

        set isRead(isRead) {
            this.__isRead = isRead;
        }

        get isRead() {
            return this.__isRead;
        }

        get id() {
            return this.__id;
        }

        get text() {
            return this.__text;
        }

        get isMy() {
            return this.__isMy;
        }

        get time() {
            return this.__time;
        }

    }

    return Message;
};
