"use strict";

module.exports = /*@ngInject*/ function($websocket, urlsApi) {

    class websocketService {
        constructor(url) {
            if (url == null) {
                throw new Error('websocket-service: is not define url');
            }
            this.url = url;
            this.stream = $websocket(this.url);
        }

        close() {
            this.stream.close();
        }

        send(message) {
            this.stream.send(JSON.stringify(message));
        }

        on(callback) {
            this.stream.onMessage(callback);
        }

        onError(callback) {
            this.stream.onClose(callback);
        }

        onOpen(callback) {
            this.stream.onOpen(callback);
        }

        onClose(callback) {
            this.stream.onClose(callback);
        }
    }

    return new websocketService(urlsApi.websocket_interaction);
};
