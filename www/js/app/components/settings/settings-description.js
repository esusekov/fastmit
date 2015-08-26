"use strict";

module.exports = /*@ngInject*/ function($cordovaGlobalization) {

    //return $cordovaGlobalization.getPreferredLanguage()
    //    .then(language => {
    //        return {
    //            language: language,
    //            notification: true
    //        };
    //    });

    return {
        language: 'ru',
        notification: true,
        vibration: true
    };
};
