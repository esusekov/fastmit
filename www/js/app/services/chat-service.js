"use strict";

module.exports = /*@ngInject*/ function (websocketInteractionService,
    messageFactoryService, messagesBoxService, eventer, storageService) {

    function send(friendId, message) {
        var stateTransfer = message.stateTransfer;
        stateTransfer.transfer();

        websocketInteractionService.send({
            friendId: friendId,
            message: message.getMessageFormatReceiver()
        }).then(() => {
            stateTransfer.transferred();
        }).catch(() => {
            stateTransfer.notTransferred();
        });
    }

    function setArrayMessagesInBox(arrayMessages) {
        arrayMessages.forEach(info => {
            var messages = info.messages.map(message => {
                return messageFactoryService.createIn(message);
            });
            messagesBoxService.setMessages(info.friendId, messages);
        });
    }

    function setMessageInBox(data) {
        var message = messageFactoryService.createIn(data.message);
        messagesBoxService.setMessage(data.friendId, message);
    }

    function handlerMessage(event) {
        console.log('SOCKET EVENT', event);
        var type = event.type;
        var body = event.body;

        switch (type) {
            case 'message':
                setMessageInBox(body);
                break;

            case 'messages':
                setMessagesInBox(body);
                break;
        }
    }

    function handlerSaveInStorage() {
        var messagesStorage = messagesBoxService.getBoxFormatStorage();
        storageService.setMessagesBox(messagesStorage);
    }

    function handlerClearStorage() {
        storageService.clearMessagesBox();
    }

    function handlerRemoveMessage(messageId) {
        messagesBoxService.removeMessageById(messageId);
    }

    return {
        start() {
            console.log('Start');
            storageService.getMessagesBox().then(messagesStorage => {
                console.log('MEssageBOX STORE', messagesStorage);

                if (messagesStorage != null) {
                    setArrayMessagesInBox(messagesStorage);
                }
            });

            websocketInteractionService.open();
            websocketInteractionService.on(handlerMessage);

            messagesBoxService.on('save-in-storage', handlerSaveInStorage);
            messagesBoxService.on('clear-storage', handlerClearStorage);
            eventer.on('remove-message', handlerRemoveMessage);
        },

        finish() {
            console.log('Stop');
            messagesBoxService.off('save-in-storage', handlerSaveInStorage);
            messagesBoxService.off('clear-storage', handlerClearStorage);
            eventer.off('remove-message', handlerRemoveMessage);
            websocketInteractionService.close();
            messagesBoxService.clearBox();
        },

        sendMessage(friendId, data) {
            var message = messageFactoryService.createOut(data);
            messagesBoxService.setMessage(friendId, message);

            send(friendId, message);
        },

        resendMessage(friendId, messageId) {
            var message = messagesBoxService.getMessage(friendId, messageId);

            send(friendId, message);
        }
    };
};
