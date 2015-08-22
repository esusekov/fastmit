"use strict";

module.exports = /*@ngInject*/ function (websocketInteractionService,
    messageFactoryService, messagesBoxService, eventer,
    storageService, photoLoaderService, encryptionService) {

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

    function encryptMessage(publicKey, message) {
        if (message.isTypeText) {
            message.encodedText = encryptionService.encryptText(publicKey, message.text);
        } else if (message.isTypePhoto) {
            var passPhrase = encryptionService.generatePassPhrase();
            message.photoData = encryptionService.encryptPhoto(passPhrase, message.photoData);
            message.encodedPassPhrase = encryptionService.encryptText(publicKey, passPhrase);
        }
    }

    function decryptMessage(message) {
        if (message.isTypeText) {
            message.text = encryptionService.decryptText(message.encodedText);
        }
    }

    function handlerMessage(message) {
        decryptMessage(message);
        setPhotoInQueueLoader(message);
    }

    function setArrayMessagesInBox(arrayMessages, handlerMessage) {
        arrayMessages.forEach(info => {
            var messages = info.messages.map(message => {
                var messageIn = messageFactoryService.createIn(message);

                if (handlerMessage != null) {
                    handlerMessage(messageIn);
                }

                return messageIn;
            });
            messagesBoxService.setMessages(info.friendId, messages);
        });
    }

    function setMessageInBox(data, handlerMessage) {
        var messageIn = messageFactoryService.createIn(data.message);

        if (handlerMessage != null) {
            handlerMessage(messageIn);
        }

        messagesBoxService.setMessage(data.friendId, messageIn);
    }

    function handlerOnMessage(event) {
        console.log('SOCKET EVENT', event);
        var type = event.type;
        var body = event.body;

        switch (type) {
            case 'message':
                setMessageInBox(body, handlerMessage);
                break;

            case 'messages':
                setArrayMessagesInBox(body, handlerMessage);
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
                    setArrayMessagesInBox(messagesStorage);
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

        sendMessage(friendId, publicKey, data) {
            var message = messageFactoryService.createOut(data);
            console.log('SEND MEssage - 1', data);

            encryptMessage(publicKey, message);

            console.log('SEND MEssage', data);

            messagesBoxService.setMessage(friendId, message);
            send(friendId, message);
        },

        resendMessage(friendId, messageId) {
            console.log(friendId, messageId);
            
            var message = messagesBoxService.getMessage(friendId, messageId);

            send(friendId, message);
        }
    };
};
