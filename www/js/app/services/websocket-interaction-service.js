"use strict";

module.exports = /*@ngInject*/ function(websocketService, urlsApi) {

    var socket = new websocketService(urlsApi.websocketInteraction);

    return {
        start() {
            socket.start();
        },

        stop() {
            socket.stop();
        },

        send(data) {
            var message = {
                type: 'message',
                body: data
            };

            return socket.send(message);
        },

        on(callback) {
            socket.on('message', callback);
        }
    };
};
