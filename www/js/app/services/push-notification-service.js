"use strict";

module.exports = /*@ngInject*/ function($cordovaPush, $rootScope, globalConstants, $cordovaDialogs, httpService) {

    console.dir($cordovaPush);

    var config = {
        senderID: globalConstants.SENDER_ID
    };

    function storeDeviceToken(type) {
        // Create a random userid to store with it
        var user = { user: 'user' + Math.floor((Math.random() * 10000000) + 1), type: type, token: regId };
        console.log("Post token for registered device with data " + JSON.stringify(user));

        //$http.post('http://192.168.1.16:8000/subscribe', JSON.stringify(user))
        //    .success(function (data, status) {
        //        console.log("Token stored, device is successfully subscribed to receive push notifications.");
        //    })
        //    .error(function (data, status) {
        //        console.log("Error storing device token." + data + " " + status)
        //    }
        //);
    }

    function handleAndroid(notification) {
        // ** NOTE: ** You could add code for when app is in foreground or not, or coming from coldstart here too
        //             via the console fields as shown.
        console.log("In foreground " + notification.foreground  + " Coldstart " + notification.coldstart);
        if (notification.event == "registered") {
            regId = notification.regid;
            httpService.setDeviceToken(regId);
        }
        else if (notification.event == "message") {
            $cordovaDialogs.alert(notification.message, "Push Notification Received");
        }
        else if (notification.event == "error")
            $cordovaDialogs.alert(notification.msg, "Push notification error event");
        else $cordovaDialogs.alert(notification.event, "Push notification handler - Unprocessed Event");
    }

    function setListener() {

        $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
            console.log(JSON.stringify([notification]));
            handleAndroid(notification);
        });
    }

    var regId = null;

    return {
        register() {
            return $cordovaPush.register(config)
                .then((result) => {
                    console.log('PUSH SUCCESS', result);
                    setListener();
                }, (err) => {
                    console.log('PUSH ERROR', err);
                });
        },

        unregister() {
            return $cordovaPush.unregister();
        }
    };
};
