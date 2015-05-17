"use strict";

module.exports = /*@ngInject*/ function(websocketService, urlsApi) {

    class websocketInteraction {
        constructor() {
            var url = urlsApi.websocket_interaction;
            this.socket = new websocketService(url);
        }

        on(callback) {
            this.socket.on(callback);
        }

        send(data) {
            var message = {
                type: 'message',
                body: data
            };
            
            return this.socket.send(message);
        }
    }

    return new websocketInteraction();
};
