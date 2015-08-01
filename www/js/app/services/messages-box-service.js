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

        setMessages(id, messagesArray) {
            if (this.hasMessagesById(id)) {
                var messages = messagesBox[id];
                messages.push.apply(messages, messagesArray);
            } else {
                messagesBox[id] = messagesArray;
            }
            console.log(messagesBox);
            
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
        },

        hasMessagesById(id) {
            return messagesBox.hasOwnProperty(id);
        }
    };
};
