"use strict";

module.exports = /*@ngInject*/ function (websocketInteractionService,
    messageFactoryService, messagesBoxService, eventer,
    storageService, photoLoaderService) {

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
        photoLoaderService.setPhotoInQueueLoader(message);
    }

    function setArrayMessagesInBox(arrayMessages) {
        arrayMessages.forEach(info => {
            var messages = info.messages.map(message => {
                var messageIn = messageFactoryService.createIn(message);
                setPhotoInQueueLoader(messageIn);
                return messageIn;
            });
            messagesBoxService.setMessages(info.friendId, messages);
        });
    }

    function setMessageInBox(data) {
        var message = messageFactoryService.createIn(data.message);
        setPhotoInQueueLoader(message);
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
                setArrayMessagesInBox(body);
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
                websocketInteractionService.open();
                websocketInteractionService.on(handlerMessage);

                messagesBoxService.on('save-in-storage', handlerSaveInStorage);
                messagesBoxService.on('clear-storage', handlerClearStorage);
                eventer.on('remove-message', handlerRemoveMessage);
            });
        },

        finish() {
            console.log('Stop');
            websocketInteractionService.close();
            messagesBoxService.off('save-in-storage', handlerSaveInStorage);
            messagesBoxService.off('clear-storage', handlerClearStorage);
            eventer.off('remove-message', handlerRemoveMessage);
            messagesBoxService.clearBox();

            photoLoaderService.finish();
        },

        sendMessage(friendId, data) {
            var message = messageFactoryService.createOut(data);
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
