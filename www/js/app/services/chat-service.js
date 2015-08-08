"use strict";

module.exports = /*@ngInject*/ function(websocketInteractionService,
    messageFactoryService, messagesBoxService) {

    console.log('CHAT');

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

    return {
        start() {
            console.log('Start');
            websocketInteractionService.open();
            
            websocketInteractionService.on(event => {
                console.log('SOCKET EVENT', event);
                var type = event.type;
                var body = event.body;

                switch(type) {
                    case 'message':
                        var message = messageFactoryService.create(body.message);
                        messagesBoxService.setMessage(body.friendId, message);
                        break;

                    case 'messages':
                        body.forEach(data => {
                            var messages = data.messages.map(message => {
                                return messageFactoryService.create(message);
                            });
                            messagesBoxService.setMessages(data.friendId, messages);
                        });
                        break;
                }
            });
        },

        stop() {
            console.log('Stop');
            
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
