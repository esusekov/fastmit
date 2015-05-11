"use strict";

module.exports = /*@ngInject*/ function(StateModel) {

    function generateId() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }


    class MessageModel {
        constructor(opts) {
            this.__id = opts.id || generateId();
            this.__time = opts.time || Date.now();
            this.__message = opts.message;
            this.__type = opts.type;
            this.__isMy = opts.isMy;
            this.__timeout = opts.timeout || null;

            this.__state = new StateModel();
        }

        get isText() {
            return this.__type === 'text';
        }

        get isPhoto() {
            return this.__type === 'photo';
        }

        get state() {
            return this.__state;
        }

        get id() {
            return this.__id;
        }

        get type() {
            return this.__type;
        }

        get message() {
            return this.__message;
        }

        get isMy() {
            return this.__isMy;
        }

        get time() {
            return this.__time;
        }

    }

    return MessageModel;
};
