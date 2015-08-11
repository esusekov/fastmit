"use strict";

module.exports = /*@ngInject*/ function(EventEmitter) {

    var messagesBox = {};

    function forEachMessage(callback) {
        for (var key in messagesBox) {
            if (messagesBox.hasOwnProperty(key)) {
                callback(key);
            }
        }
    }

    return Object.assign(new EventEmitter(), {
        getBox() {
            return messagesBox;
        },

        getMessages(friendId) {
            this.checkMessages(friendId);

            return messagesBox[friendId];
        },

        getMessage(friendId, messageId) {
            var messages = this.getMessages(friendId);

            return messages.find(message => {
                return message.id === messageId;
            });
        },

        setMessage(friendId, message) {
            this.checkMessages(friendId);
            messagesBox[friendId].push(message);

            this.emit('save-in-storage');
        },

        setMessages(friendId, messagesArray) {
            this.checkMessages(friendId);
            var messages = messagesBox[friendId];
            messages.push.apply(messages, messagesArray);

            this.emit('save-in-storage');
        },

        checkMessages(friendId) {
            if (!this.hasMessagesById(friendId)) {
                messagesBox[friendId] = [];
            }
        },

        hasMessagesById(friendId) {
            return messagesBox.hasOwnProperty(friendId);
        },

        removeMessageById(messageId) {
            forEachMessage(key => {
                var messages = messagesBox[key];

                messages.forEach((message, index) => {
                    if (message.id === messageId) {
                        messages.splice(index, 1);
                    }
                });
            });
        },

        removeMessageByIds(friendId, messageId) {
            var messages = this.getMessages(friendId);
            var index = messages.findIndex(message => {
                return message.id === messageId;
            });

            if (index != null) {
                messages.splice(index, 1);
            }
        },

        removeMessagesById(friendId) {
            if (this.hasMessagesById(friendId)) {
                messagesBox[friendId] = [];

                this.emit('save-in-storage');
                return true;
            }
            return false;
        },

        removeTextMessagesById(friendId) {
            var messages = this.getMessages(friendId);

            messagesBox[friendId] = messages.filter(message => {
                var stateTransfer = message.stateTransfer;

                return (
                    message.isTypePhoto ||
                    stateTransfer.isTransferred ||
                    stateTransfer.isNotTransferred
                );
            });

            this.emit('save-in-storage');
        },

        removeTextMessages() {
            forEachMessage(key => {
                this.removeTextMessagesById(key);
            });
        },

        clearBox() {
            messagesBox = {};
            this.emit('clear-storage');
        }
    });
};
