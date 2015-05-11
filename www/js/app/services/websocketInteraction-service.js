"use strict";

module.exports = /*@ngInject*/ function(websocketService) {

    class websocketInteraction {
        constructor() {
            this.callbacks = {};
        }

        on(type, callback) {
            var callbacks = this.callbacks;
            if (!callbacks.hasOwnProperty(type)) {
                callbacks[type] = [];
            }
            callbacks[type].push(callback);
        }

        off(type, callback) {
            var callbacks = this.callbacks;

            if (callback.hasOwnProperty(type)) {
                var index = callbacks[type].indexOf(callback);

                if (index !== -1) {
                    callback.splice(index, 1);
                }
            }
        }

        emit(type, data) {
            var callbacks = this.callbacks;
            if (callbacks.hasOwnProperty(type)) {
                callbacks[type].forEach(callback => {
                    callback(data);
                });
            }
        }

        send(type, data) {
            console.log('Send', type, data);
            
            var packet = {
                type: type,
                body: data
            };
            websocketService.send(packet);
        }
    }

    var interaction = new websocketInteraction();

    websocketService.on(event => {
        try {
            console.log('Packet', event);
            
            var data = JSON.parse(event.data);
            var type = data.type;
            var body = data.body;

            interaction.emit(type, body);
        } catch(error) {
            console.log('websocketInteraction:', error);
            interaction.emit('error', error);
        }
    });

    return {

        onMessage: function(callback) {
            interaction.on('message', callback);
        },

        onFriend: function(callback) {
            interaction.on('friend', callback);
        },

        onError: function(callback) {
            interaction.on('error', callback);
        },

        sendMessage: function(data) {
            interaction.send('message', data);
        }

    };
};
