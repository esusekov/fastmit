"use strict";

module.exports = /*@ngInject*/ function(statesLoadingConstants) {

    class StateLoadingImageModel {
        constructor() {
            this.value = statesLoadingConstants.NONE;
        }

        none() {
            this.value = statesLoadingConstants.NONE;
        }

        loading() {
            this.value = statesLoadingConstants.LOADING;
        }

        loaded() {
            this.value = statesLoadingConstants.LOADED;
        }

        notLoaded() {
            this.value = statesLoadingConstants.NOT_LOADED;
        }

        get isNone() {
            return this.value === statesLoadingConstants.NONE;
        }

        get isLoading() {
            return this.value === statesLoadingConstants.LOADING;
        }

        get isLoaded() {
            return this.value === statesLoadingConstants.LOADED;
        }

        get isNotLoaded() {
            return this.value === statesLoadingConstants.NOT_LOADED;
        }
    }

    return StateLoadingImageModel;
};
