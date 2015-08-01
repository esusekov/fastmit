"use strict";

module.exports = /*@ngInject*/ function($websocket, $timeout, $q) {
    class WebsocketService {
        constructor(url) {
            if (url == null) {
                throw new Error('websocketService: is not define url');
            }

            this.url = url;
            this.stream = null;
            this.connected = false;
            this.timeoutReopen = 10 * 1000;

            this.openStream();
        }

        openStream() {
            var stream = $websocket(this.url);
            this.stream = stream;

            stream.onOpen(event => {
                this.connected = true;
            });

            stream.onClose(event => {
                this.connected = false;

                $timeout(() => {
                    this.openStream();
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
    }

    return WebsocketService;
};
