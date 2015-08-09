"use strict";

module.exports = /*@ngInject*/ function($websocket, $timeout, $q, readyStateConstants, globalConstants) {

    class WebsocketService {
        constructor(url) {
            if (url == null) {
                throw new Error('websocketService: is not define url');
            }

            this.url = url;
            this.timeoutReopen = globalConstants.DEFAULT_TIMEOUT;
            this.stream = null;
            this.connected = false;
        }

        open() {
            var stream = $websocket(this.url);
            this.stream = stream;

            stream.onOpen(event => {
                this.connected = true;
            });

            stream.onClose(event => {
                this.connected = false;

                $timeout(() => {
                    this.open();
                }, this.timeoutReopen);
            });
        }

        close() {
            var stream = this.stream;
            if (stream != null) {
                stream.close();
                stream = null;
            }
        }

        send(message) {
            return $q((resolve, reject) => {
                $timeout(() => {
                    if (this.connected) {
                        this.stream.send(JSON.stringify(message));
                        resolve();
                    } else {
                        reject('not connected');
                    }
                }, 5 * 1000);
            });
            //if (this.connected) {
            //    return this.stream.send(JSON.stringify(message));
            //}
            //return $q.reject('not connected');
        }

        on(callback) {
            this.stream.onMessage(event => {
                var data = JSON.parse(event.data);
                callback(data);
            });
        }

        isOpen() {
            return this.stream.readyState === readyStateConstants.OPEN;
        }

        isClosing() {
            return this.stream.readyState === readyStateConstants.CLOSING;
        }

        isClosed() {
            return this.stream.readyState === readyStateConstants.CLOSED;
        }

        isConnecting() {
            return this.stream.readyState === readyStateConstants.CONNECTING;
        }
    }

    return WebsocketService;
};
