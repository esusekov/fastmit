"use strict";

module.exports = /*@ngInject*/ function(messageModel) {

    class Correspondence {
        constructor() {
            this.__list = [];
        }

        get list() {
            return this.__list;
        }

        setMessage(data) {
            var message = new messageModel(data);
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

        searchMessageById(id) {

            var message = this.__list.find(message => {
                return message.id === id;
            });

            return message;
        }

        indexOf(id) {
            for (var i = 0; this.size(); ++i) {
                if (this.__list[i].id === id) {
                    return i;
                }
            }
        }

        deleteMessage(id) {
            var index = this.indexOf(id);
            if (index != null) {
                this.__list.splice(index, 1);
            }
        }


    }

    return Correspondence;
};



