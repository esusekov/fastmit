"use strict";

module.exports = /*@ngInject*/ function(websocketInteractionService, MessageModel, messagesBoxService) {
    websocketInteractionService.on(event => {
        var type = event.type;
        var data = event.data;

        switch(type) {
            case 'message':
                var friendId = data.friendId;
                messagesBoxService.setMessage(friendId, data.message);
                break;
        }
    });

    function send(friendId, message) {
        var stateTransfer = message.stateTransfer;
        stateTransfer.transfer();

        websocketInteractionService.send({
            friendId: friendId,
            message: message
        }).then(() => {
            stateTransfer.tranferred();
        }).catch(() => {
            stateTransfer.notTransferred();
        });
    }

    return {
        sendMessage(friendId, data) {
            var message = new MessageModel(data);
            messagesBoxService.setMessages(friendId, [message]);

            send(friendId, message);
        },

        resendMessage(friendId, messageId) {
            var message = messagesBoxService.getMessage(friendId, messageId);

            send(friendId, message);
        }
    };
};
