"use strict";

module.exports = /*@ngInject*/ function(EventEmitter) {

    var messagesBox = {};

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
                return message.messageId === messageId;
            });
        },

        getInboxMessagesById(friendId) {
            if (this.hasMessagesById(friendId)) {
                return messagesBox[friendId].filter(message => {
                    return !message.isMy;
                });
            }
        },

        getCountInboxMessages(friendId) {
            var messages = this.getMessages(friendId);

            return messages.filter(message => {
                return !message.isMy;
            }).length;
        },

        getBoxFormatStorage() {
            var messagesStorage = [];

            this.forEachMessages(friendId => {
                var messages = this.getInboxMessagesById(friendId).map(message => {
                    return message.getFormatStorage();
                });

                messagesStorage.push({
                    friendId: friendId,
                    messages: messages
                });
            });

            return messagesStorage;
        },

        getCountInboxMessages(friendId) {
            var messages = this.getMessages(friendId);

            return messages.filter(message => {
                return !message.isMy;
            }).length;
        },

        getCountOutboxMessagesNotTransferred(friendId) {
            var messages = this.getMessages(friendId);

            return messages.filter(message => {
                return (
                    message.isMy &&
                    message.stateTransfer.isNotTransferred
                );
            }).length;
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
            this.forEachMessages(key => {
                var messages = messagesBox[key];

                messages.forEach((message, index) => {
                    if (message.messageId === messageId) {
                        messages.splice(index, 1);
                    }
                });
            });
        },

        removeMessageByIds(friendId, messageId) {
            var messages = this.getMessages(friendId);
            var index = messages.findIndex(message => {
                return message.messageId === messageId;
            });

            if (index != null) {
                messages.splice(index, 1);

                this.emit('save-in-storage');
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
                if (message.isMy) {
                    var stateTransfer = message.stateTransfer;

                    return(
                        stateTransfer.isTransfer ||
                        stateTransfer.isNotTransferred
                    );
                } else {
                    return message.isTypePhoto;
                }
            });

            this.emit('save-in-storage');
        },

        removeTextMessages() {
            this.forEachMessages(key => {
                this.removeTextMessagesById(key);
            });
        },

        forEachMessages(callback) {
            for (var key in messagesBox) {
                if (this.hasMessagesById(key)) {
                    callback(key);
                }
            }
        },

        clearBox() {
            messagesBox = {};
            this.emit('clear-storage');
        }
    });
};
