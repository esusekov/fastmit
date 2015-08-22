"use strict";

module.exports = /*@ngInject*/ function (websocketInteractionService,
    messageFactoryService, messagesBoxService, eventer,
    storageService, photoLoaderService, encryptionMessageService) {

    function send(friendId, message) {
        console.log('Send', message);
        
        var stateTransfer = message.stateTransfer;
        stateTransfer.transfer();

        websocketInteractionService.send({
            friendId: friendId,
            message: message.getFormatReceiver()
        }).then(() => {
            stateTransfer.transferred();
        }).catch((e) => {
            console.log(e);
            stateTransfer.notTransferred();
        });
    }

    function setPhotoInQueueLoader(message) {
        if (message.isTypePhoto) {
            photoLoaderService.setPhotoInQueueLoader(message);
        }
    }

    function setArrayMessagesInBox(arrayMessages, handlerProcessing) {
        arrayMessages.forEach(data => {
            var messages = data.messages.map(messageData => {
                return handlerProcessing(messageData);
            });

            messagesBoxService.setMessages(data.friendId, messages);
        });
    }

    function setMessageInBox(data) {
        var messageData = data.message;
        encryptionMessageService.dec(messageData);

        var messageIn = messageFactoryService.createIn(messageData);
        setPhotoInQueueLoader(messageIn);

        messagesBoxService.setMessage(data.friendId, messageIn);
    }

    function handlerOnMessage(event) {
        console.log('SOCKET EVENT', event);
        var type = event.type;
        var body = event.body;

        switch (type) {
            case 'message':
                setMessageInBox(body);
                break;

            case 'messages':
                setArrayMessagesInBox(body, messageData => {
                    encryptionMessageService.dec(messageData);
                    var messageIn = messageFactoryService.createIn(messageData);
                    setPhotoInQueueLoader(messageIn);

                    return messageIn;
                });
                break;
        }
    }

    function handlerSaveInStorage() {
        console.log('Save in Storage Messages');
        var messagesStorage = messagesBoxService.getBoxFormatStorage();

        storageService.setMessagesBox(messagesStorage);
    }

    function handlerClearStorage() {
        storageService.clearMessagesBox();
    }

    function handlerRemoveMessage(messageId) {
        console.log('Remove message');
        messagesBoxService.removeMessageById(messageId);
    }

    return {
        start() {
            console.log('Start');
            return photoLoaderService.start().then(() => {
                return storageService.getMessagesBox();
            }).then(messagesStorage => {
                console.log('MEssageBOX STORE', messagesStorage);

                if (messagesStorage != null) {
                    setArrayMessagesInBox(messagesStorage, messageData => {
                        return messageFactoryService.createIn(messageData);
                    });
                }
            }).then(() => {
                websocketInteractionService.start();
                websocketInteractionService.on(handlerOnMessage);

                messagesBoxService.on('save-in-storage', handlerSaveInStorage);
                messagesBoxService.on('clear-storage', handlerClearStorage);
                eventer.on('remove-message', handlerRemoveMessage);
            });
        },

        stop() {
            console.log('Stop');
            messagesBoxService.off('save-in-storage', handlerSaveInStorage);
            messagesBoxService.off('clear-storage', handlerClearStorage);
            eventer.off('remove-message', handlerRemoveMessage);
            messagesBoxService.clearBox();

            websocketInteractionService.stop();
            photoLoaderService.stop();
        },

        sendMessage(friendId, publicKey, messageData) {
            encryptionMessageService.enc(publicKey, messageData);
            var message = messageFactoryService.createOut(messageData);
            messagesBoxService.setMessage(friendId, message);

            send(friendId, message);
        },

        resendMessage(friendId, messageId) {
            var message = messagesBoxService.getMessage(friendId, messageId);

            send(friendId, message);
        }
    };
};
