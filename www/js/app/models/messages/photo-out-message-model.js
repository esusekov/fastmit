"use strict";

module.exports = /*@ngInject*/ function(OutboxMessageModel) {

    class PhotoOutMessageModel extends OutboxMessageModel {
        constructor(opts) {
            super(opts);
            this.timeout = opts.timeout;
            this.photoData = opts.photoData;
        }

        getFormatReceiver() {
            var message = this.getBaseFormatReceiver();
            message.photoData = this.photoData;
            message.timeout = this.timeout;

            return message;
        }
    }

    return PhotoOutMessageModel;
};
