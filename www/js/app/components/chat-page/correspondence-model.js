"use strict";

module.exports = /*@ngInject*/ function() {

    class Correspondence {
        constructor() {
            this.__list = [];
        }

        getList() {
            return this.__list;
        }

        setMessageCompanion(message) {
            this.__list.push(message);
        }

        setMessageMy(message) {
            this.__list.push(message);
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



