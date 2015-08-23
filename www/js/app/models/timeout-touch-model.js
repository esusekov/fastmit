"use strict";

module.exports = /*@ngInject*/ function($timeout) {

    class TimeoutTouchModel {
        constructor() {
            this.timeoutId = null;
            this.statusTouch = false;
            this.timeout = 1000;
        }

        start(callback) {
            if (this.statusTouch) {
                callback();
            } else {
                this.timeoutId = $timeout(() => {
                    this.statusTouch = true;
                    callback();
                }, this.timeout);
            }
        }

        stop() {
            if (!this.statusTouch) {
                $timeout.cancel(this.timeoutId);
            }
        }
    }

    return TimeoutTouchModel;
};
