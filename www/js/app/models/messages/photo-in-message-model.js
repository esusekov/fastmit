"use strict";

module.exports = /*@ngInject*/ function(InboxMessageModel, TimeoutPhotoModel, eventer) {

    class PhotoInMessageModel extends InboxMessageModel {
        constructor(opts) {
            super(opts);
            this.timeout = new TimeoutPhotoModel(opts);
            this.photoUrl = opts.photoUrl;

            this.timeout.on('timeout-finish', () => {
                var messageId = this.id;
                eventer.emit('remove-message', messageId);
            });
        }
    }

    return PhotoInMessageModel;
};
