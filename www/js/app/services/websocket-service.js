"use strict";

module.exports = /*@ngInject*/ function($websocket,
    $timeout, $q, readyStateConstants, globalConstants, EventEmitter) {

    class WebsocketService extends EventEmitter {
        constructor(url) {
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

                stream.onMessage(event => {
                    var data = JSON.parse(event.data);
                    this.emit('message', data);
                });
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
