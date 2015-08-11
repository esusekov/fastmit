"use strict";

module.exports = /*@ngInject*/ function(InboxMessageModel) {

    class TextInMessageModel extends InboxMessageModel {
        constructor(opts) {
            super(opts);
            this.text = opts.text;
        }
    }

    return TextInMessageModel;
};
