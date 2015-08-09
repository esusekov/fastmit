"use strict";

module.exports = /*@ngInject*/ function($rootScope) {
    var messagesBox = {};

    function forEachMessage(callback) {
        for (var key in messagesBox) {
            if (messagesBox.hasOwnProperty(key)) {
                callback(key);
            }
        }
    }

    function emitSaveInStorage() {
        $rootScope.$emit('save-in-storage');
    }

    function emitClearStorage() {
        $rootScope.$emit('clear-storage');
    }

    return {
        getBox() {
            return messagesBox;
        },

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

        setMessage(friendId, message) {
            this.checkMessages(friendId);
            messagesBox[friendId].push(message);

            emitSaveInStorage();
        },

        setMessages(friendId, messagesArray) {
            this.checkMessages(friendId);
            var messages = messagesBox[friendId];
            messages.push.apply(messages, messagesArray);

            emitSaveInStorage();
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

                emitSaveInStorage();
                return true;
            }
            return false;
        },

        removeTextMessagesById(friendId) {
            var messages = this.getMessages(friendId);

            messagesBox[friendId] = messages.filter(message => {
                return message.isTypePhoto;
            });

            emitSaveInStorage();
        },

        removeTextMessages() {
            forEachMessage(key => {
                this.removeTextMessagesById(key);
            });
        },

        clearBox() {
            messagesBox = {};
            emitClearStorage();
        }
    };
};
