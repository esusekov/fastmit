"use strict";

module.exports = /*@ngInject*/ function($ionicPopup) {

     return {

         alert: function(text) {
            var alert = $ionicPopup.alert({
                title: text
            });
            alert.then(res => {
                console.log(res);
            });
         }

     };

};