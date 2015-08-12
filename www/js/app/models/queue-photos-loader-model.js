"use strict";

module.exports = /*@ngInject*/ function() {

    class QueuePhotosLoader {
        constructor() {
            this.queue = [];
        }

        size() {
            return this.queue.length;
        }

        isEmpty() {
            return this.size() === 0;
        }

        isNotEmpty() {
            return !this.isEmpty();
        }

        clear() {
            this.queue = [];
        }

        findIndexMessage(messageId) {
            return this.queue.findIndex(message => {
                return message.mesageId = messageId;
            });
        }

        shift() {
            return this.queue.shift();
        }

        push(message) {
            this.queue.push(message);
        }

        up(messageId) {
            var queue = this.queue;
            var index = this.findIndexMessage(messageId);

            var message = queue.splice(index, 1)[0];

            queue.unshift(message);
        }
    }

    return QueuePhotosLoader;
};
