"use strict";

module.exports = /*@ngInject*/ function($localForage, $translate, globalConstants) {

    var SETTINGS_KEY = globalConstants.SETTINGS_KEY;

    var languagesMap = {
        en: 'English',
        ru: 'Русский'
    };

    var settingsDescription = {
        language: 'ru',
        notification: true,
        vibration: true
    };

    var Settings = function() {
        this.__language = null;
        this.__notification = null;
        this.__vibration = null;
    };

    Settings.prototype = {
        changeNotification: function() {
            this.notification = !this.notification;
        },

        changeLanguage: function(lang) {
            this.language = lang;
        },

        changeVibration: function() {
            this.vibration = !this.vibration;
        },

        get vibration() {
            return this.__vibration;
        },

        set vibration(value) {
            this.__vibration = value;
            this.saveInStorage();
        },

        get language() {
            return this.__language;
        },

        set language(value) {
            this.__language = value;
            this.saveInStorage();
            $translate.use(this.__language);
        },

        get fullLanguageName() {
            return languagesMap[this.__language];
        },

        get notification() {
            return this.__notification;
        },

        set notification(value) {
            this.__notification = value;
            this.saveInStorage();
        },

        init: function() {
            console.log('INIT');
            $localForage.getItem(SETTINGS_KEY).then(data => {
                console.log('SETTINGS', data);
                
                if (data != null) {
                    this.setSettings(data);
                } else {
                    this.setSettings(settingsDescription);
                }

                $translate.use(this.__language);
            });
        },

        setSettings: function(data) {
            this.__language = data.language;
            this.__notification = data.notification;
            this.__vibration = data.vibration;
            this.saveInStorage();
        },

        compileSettingsForStorage: function() {
            return {
                language: this.__language,
                notification: this.__notification,
                vibration: this.__vibration
            };
        },

        saveInStorage: function() {
            var data = this.compileSettingsForStorage();
            console.log(data);


            $localForage.setItem(SETTINGS_KEY, data);
        }
    };

    return new Settings();
};