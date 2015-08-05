"use strict";

module.exports = /*@ngInject*/ function() {
    var messagesBox = {};

    return {
        getMessages(friendId) {
            if (!this.hasMessagesById(friendId)) {
                messagesBox[friendId] = [];
            }

            return messagesBox[friendId];
        },

        getMessage(friendId, messageId) {
            var messages = this.getMessages(friendId);

            return messages.find(message => {
                return message.id === messageId;
            });
        },

        setMessage(id, message) {
            this.checkMessages(id);
            messagesBox[id].push(message);
        },

        setMessages(id, messagesArray) {
            this.checkMessages(id);
            var messages = messagesBox[id];
            messages.push.apply(messages, messagesArray);
        },

        checkMessages(id) {
            if (!this.hasMessagesById(id)) {
                messagesBox[id] = [];
            }
        },

        hasMessagesById(id) {
            return messagesBox.hasOwnProperty(id);
        },

        removeMessageById(friendId, messageId) {
            var messages = this.getMessages(friendId);
            var index = messages.findIndex(message => {
                return message.id === messageId;
            });

            if (index != null) {
                messages.splice(index, 1);
                return true;
            }
            return false;
        },

        removeMessagesById(id) {
            if (this.hasMessagesById(id)) {
                messagesBox[id] = [];
                return true;
            }
            return false;
        },

        clearBox() {
            messagesBox = {};
        }
    };
};
