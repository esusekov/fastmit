"use strict";

module.exports = /*@ngInject*/ function($localForage, $translate) {

    var SETTINGS_KEY = 'SETTINGS_KEY';

    var Settings = function() {
        this.__language = null;
        this.__notification = null;
    };

    Settings.prototype = {

        get language() {
            return this.__language;
        },

        set language(value) {
            this.__language = value;
            this.__saveInStorage();
            $translate.use(this.__language);
        },

        get notification() {
            return this.__notification;
        },

        set notification(value) {
            this.__notification = value;
            this.__saveInStorage();
        },

        init: function(description) {
            $localForage.getItem(SETTINGS_KEY).then(data => {
                console.log(data);
                
                if (data != null) {
                    this.__setSettings(data);
                } else {
                    this.__setSettings(description);
                }

                $translate.use(this.__language);
            });
        },

        __setSettings: function(data) {
            this.__language = data.language;
            this.__notification = data.notification;
            this.__saveInStorage();
        },

        __compileSettingsForStorage: function() {
            return {
                language: this.__language,
                notification: this.__notification
            };
        },

        __saveInStorage: function() {
            $localForage.setItem(SETTINGS_KEY, this.__compileSettingsForStorage());
        }

    };

    return new Settings();
};