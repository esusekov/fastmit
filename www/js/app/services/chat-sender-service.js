"use strict";

module.exports = /*@ngInject*/ function(websocketInteractionService, MessageModel, messagesBoxService) {
    websocketInteractionService.on(event => {
        console.log('SOCKET EVENT', event);
        var type = event.type;
        var body = event.body;

        switch(type) {
            case 'message':
                var message = new MessageModel(body.message);
                messagesBoxService.setMessage(body.friendId, message);
                break;

            case 'messages':
                body.forEach(data => {
                    var messages = data.messages.map(message => {
                        return new MessageModel(message);
                    });
                    messagesBoxService.setMessages(data.friendId, messages);
                });
                break;
        }
    });

    function send(friendId, message) {
        var stateTransfer = message.stateTransfer;
        stateTransfer.transfer();

        websocketInteractionService.send({
            friendId: friendId,
            message: message.formatForReciver
        }).then(() => {
            stateTransfer.transferred();
        }).catch(() => {
            stateTransfer.notTransferred();
        });
    }

    return {
        sendMessage(friendId, data) {
            var message = new MessageModel(data);
            messagesBoxService.setMessage(friendId, message);

            send(friendId, message);
        },

        resendMessage(friendId, messageId) {
            var message = messagesBoxService.getMessage(friendId, messageId);

            send(friendId, message);
        }
    };
};
