"use strict";

module.exports = /*@ngInject*/ function($localForage, $translate) {

    var SETTINGS_KEY = 'SETTINGS_KEY';

    var Settings = function() {
        this.__language = null;
        this.__notification = null;
    };

    Settings.prototype = {

        changeNotification: function() {
            this.notification = !this.notification;
        },

        changeLanguage: function(lang) {
            this.language = lang;
        },

        get language() {
            return this.__language;
        },

        set language(value) {
            this.__language = value;
            this.saveInStorage();
            $translate.use(this.__language);
        },

        get notification() {
            return this.__notification;
        },

        set notification(value) {
            this.__notification = value;
            this.saveInStorage();
        },

        init: function(description) {
            $localForage.getItem(SETTINGS_KEY).then(data => {
                console.log(data);
                
                if (data != null) {
                    this.setSettings(data);
                } else {
                    this.setSettings(description);
                }

                $translate.use(this.__language);
            });
        },

        setSettings: function(data) {
            this.__language = data.language;
            this.__notification = data.notification;
            this.saveInStorage();
        },

        compileSettingsForStorage: function() {
            return {
                language: this.__language,
                notification: this.__notification
            };
        },

        saveInStorage: function() {
            $localForage.setItem(SETTINGS_KEY, this.compileSettingsForStorage());
        }

    };

    return new Settings();
};