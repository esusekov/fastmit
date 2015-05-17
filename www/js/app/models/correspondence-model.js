"use strict";

module.exports = /*@ngInject*/ function(MessageModel) {

    class CorrespondenceModel {
        constructor() {
            this.__list = [];
        }

        get list() {
            return this.__list;
        }

        setMessage(data) {
            var message = new MessageModel(data);
            this.__list.push(message);
            return message;
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

        getMessageById(id) {
            return this.__list.find(message => {
                return message.id === id;
            });
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

    return CorrespondenceModel;
};



