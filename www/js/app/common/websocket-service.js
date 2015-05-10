"use strict";

module.exports = /*@ngInject*/ function($websocket) {

    var url_for_websocket = 'ws://localhost';

    class websocketService {
        constructor(url) {
            if (url == null) throw new Error('WebsocketService: is not define url');
            this.stream = null;//$websocket(url);
        }

        send(message) {
            this.stream.send(JSON.stringify(message));
        }

        on(callback) {
            this.stream.onMessage(message => {
                var data = {};
                console.log(message);
                try {
                    data = JSON.parse(message.data);
                } catch(error) {
                    console.log(error);
                }

                callback(data);
            });
        }

    }

    return new websocketService(url_for_websocket);

};
