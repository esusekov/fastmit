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

        shift() {
            return this.queue.shift();
        }

        unshift(message) {
            this.queue.unshift(message);
        }

        push(message) {
            this.queue.push(message);
        }

        pickUp(messageId) {
            var queue = this.queue;

            var index = queue.findIndex(message => {
                return message.messageId === messageId;
            });

            if (index != 0) {
                var photo = queue.splice(index, 1)[0];
                queue.unshift(photo);
            }
        }
    }

    return QueuePhotosLoader;
};
