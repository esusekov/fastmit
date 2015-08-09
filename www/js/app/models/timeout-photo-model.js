"use strict";

module.exports = /*@ngInject*/ function($timeout, globalConstants, $rootScope) {
    var TICK = 1000;

    class TimeoutPhotoModel {
        constructor(opts) {
            this.messageId = opts.id;
            this.timeout = opts.timeout || globalConstants.DEFAULT_TIMEOUT;
            this.isStart = false;
        }

        get value() {
            return this.timeout / TICK;
        }

        onFinish(callback) {
            this.callbackFinish = callback;
        }

        start() {
            if (!this.isStart) {
                this.tick();
            }
        }

        tick() {
            this.isStart = true;

            $timeout(() => {
                this.timeout -= TICK;

                if (this.timeout === 0) {
                    $rootScope.$emit('remove-message', this.messageId);

                    if (this.callbackFinish != null) {
                        this.callbackFinish();
                    }
                } else {
                    this.tick();
                }
            }, TICK);
        }
    }

    return TimeoutPhotoModel;
};
