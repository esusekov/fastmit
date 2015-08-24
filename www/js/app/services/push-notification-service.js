"use strict";

module.exports = /*@ngInject*/ function($cordovaPush, globalConstants) {

    console.dir($cordovaPush);

    var config = {
        senderID: globalConstants.SENDER_ID
    };

    return {
        register() {
            return $cordovaPush.register(config);
        },

        unregister() {
            return $cordovaPush.unregister();
        }
    };
};
