"use strict";

module.exports = /*@ngInject*/ function($localForage, globalConstants) {
    var MESSAGES_BOX_KEY = globalConstants.MESSAGES_BOX_KEY;

    var messagesBox = {};

    function loadFromStorage() {
        $localForage.getItem(MESSAGES_BOX_KEY).then(messages => {
            console.log('MEssageBOX STORE', messages);

            if (messages != null) {
                messagesBox = messages;
            }
        });
    }

    function saveInStorage() {
        $localForage.setItem(MESSAGES_BOX_KEY, messagesBox);
    }

    function clearStorage() {
        $localForage.removeItem(MESSAGES_BOX_KEY);
    }

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

            saveInStorage();
        },

        setMessages(id, messagesArray) {
            this.checkMessages(id);
            var messages = messagesBox[id];
            messages.push.apply(messages, messagesArray);

            saveInStorage();
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

                saveInStorage();
                return true;
            }
            return false;
        },

        clearBox() {
            messagesBox = {};
            clearStorage();
        }
    };
};
