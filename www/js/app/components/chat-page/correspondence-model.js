"use strict";

module.exports = /*@ngInject*/ function(messageModel) {

    class Correspondence {
        constructor() {
            this.__list = [];
        }

        getList() {
            return this.__list;
        }

        setMyMessage(opts) {
            opts.isMy = true;
            var message = new messageModel(opts);
            this.__list.push(message);
        }

        clear() {
            this.__list = [];
        }

        size() {
            return this.__list.length;
        }

        isEmpty() {
            return this.size() === 0;
        }

    }

    return Correspondence;
};



