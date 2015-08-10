"use strict";

module.exports = /*@ngInject*/ function($timeout, globalConstants, EventEmitter) {
    var TICK = 1000;

    class TimeoutPhotoModel extends EventEmitter {
        constructor(opts) {
            super();
            this.messageId = opts.id;
            this.timeout = opts.timeout || globalConstants.DEFAULT_TIMEOUT;
            this.isStart = false;
        }

        get value() {
            return this.timeout / TICK;
        }

        start() {
            if (!this.isStart) {
                this.emit('timeout-start');
                this.tick();
            }
        }

        tick() {
            this.isStart = true;

            $timeout(() => {
                this.timeout -= TICK;

                if (this.timeout === 0) {
                    this.emit('timeout-finish');
                } else {
                    this.tick();
                }
            }, TICK);
        }
    }

    return TimeoutPhotoModel;
};
