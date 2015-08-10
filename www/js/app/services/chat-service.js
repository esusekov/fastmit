"use strict";

module.exports = /*@ngInject*/ function (websocketInteractionService,
    messageFactoryService, messagesBoxService, $rootScope, $localForage, globalConstants) {

    var MESSAGES_BOX_KEY = globalConstants.MESSAGES_BOX_KEY;
    var offRemoveMessageHandler = null;

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

    function setMessagesInBox(data) {
        data.forEach(info => {
            var messages = info.messages.map(message => {
                return messageFactoryService.create(message);
            });
            messagesBoxService.setMessages(info.friendId, messages);
        });
    }

    function setMessageInBox(data) {
        var message = messageFactoryService.create(data.message);
        messagesBoxService.setMessage(data.friendId, message);
    }

    function onMessageHandler(event) {
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

    function getMessagesBoxFormatStorage() {
        var messagesBox = messagesBoxService.getBox();
        var messagesStorage = [];

        for (var key in messagesBox) {
            if (messagesBox.hasOwnProperty(key)) {
                var messages = messagesBox[key].filter(message => {
                    return !message.isMy;
                }).map(message => {
                    return message.getMessageFormatReceiver();
                });

                messagesStorage.push({
                    friendId: key,
                    messages: messages
                });
            }
        }

        return messagesStorage;
    }

    function onSaveInStorageHandler() {
        var messagesStorage = getMessagesBoxFormatStorage();
        console.log(messagesStorage);
        
        $localForage.setItem(MESSAGES_BOX_KEY, messagesStorage);
    }

    function onClearStorageHandler() {
        $localForage.removeItem(MESSAGES_BOX_KEY);
    }

    return {
        start() {
            console.log('Start');
            websocketInteractionService.open();

            $localForage.getItem(MESSAGES_BOX_KEY).then(messagesStorage => {
                console.log('MEssageBOX STORE', messagesStorage);

                if (messagesStorage != null) {
                    setMessagesInBox(messagesStorage);
                }
            });

            websocketInteractionService.on(event => {
                onMessageHandler(event);
            });

            messagesBoxService.on('save-in-storage', onSaveInStorageHandler);
            messagesBoxService.on('clear-storage', onClearStorageHandler);

            offRemoveMessageHandler = $rootScope.$on('remove-message', (event, messageId) => {
                messagesBoxService.removeMessageById(messageId);
            });
        },

        stop() {
            console.log('Stop');
            messagesBoxService.off('save-in-storage', onSaveInStorageHandler);
            messagesBoxService.off('clear-storage', onClearStorageHandler);
            offRemoveMessageHandler();
            websocketInteractionService.close();
        },

        sendMessage(friendId, data) {
            var message = messageFactoryService.create(data);
            messagesBoxService.setMessage(friendId, message);

            send(friendId, message);
        },

        resendMessage(friendId, messageId) {
            var message = messagesBoxService.getMessage(friendId, messageId);

            send(friendId, message);
        }
    };
};
