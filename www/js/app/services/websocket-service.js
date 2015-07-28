"use strict";

module.exports = /*@ngInject*/ function($websocket, $timeout, $q) {

    class websocketService {
        constructor(url) {
            if (url == null) {
                throw new Error('websocket-service: is not define url');
            }
            this.url = url;
            this.stream = null;
            this.connected = false;
            this.open();
        }

        open() {
            console.log('Open new socket');

            this.stream = $websocket(this.url);

            this.stream.onOpen(event => {
                this.connected = true;
            });

            this.stream.onClose(event => {
                console.log('Close', event);
                this.connected = false;
                $timeout(() => {
                    this.open();
                }, 10 * 1000);
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
            return this.testSend(message);
            //if (this.connected) {
            //    return this.stream.send(JSON.stringify(message));
            //}
            //return $q.reject('not connected');
        }

        on(callback) {
            this.stream.onMessage(event => {
                console.log('ON MESSAGE', event.data);
                var data = JSON.parse(event.data);
                callback(data);
            });
        }

        testSend(message) {
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
        }

    }

    return websocketService;
};
