"use strict";

module.exports = /*@ngInject*/ function($ionicPopup, $q) {
     return {
         alert(text) {
            var alert = $ionicPopup.alert({
                title: text
            });

            alert.then(res => {
                console.log(res);
            });
         },

         confirm(text) {
            var confirm = $ionicPopup.confirm({
                template: text
            });

            return confirm.then(res => {
                if (res) {
                    return true;
                } else {
                    return $q.reject();
                }
            });
         }
     };
};
