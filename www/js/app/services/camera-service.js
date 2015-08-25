"use strict";

module.exports = /*@ngInject*/ function($cordovaCamera, $q) {
    var imageData = '';

    return  {
        get image() {
            return 'data:image/jpeg;base64,' + imageData;
        },

        get rawImage() {
            return imageData;
        },

        set image(img) {
            imageData = img;
        },

        makePhoto(options) {
            options = options || { };

            var defaultOptions = {
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: options.sourceType !== undefined ? options.sourceType : Camera.PictureSourceType.CAMERA,
                allowEdit: options.allowEdit || false,
                encodingType: Camera.EncodingType.JPEG,
                correctOrientation: true
            };

            return $cordovaCamera.getPicture(defaultOptions).then((data) => {
                console.log(data);
                return data;
            }, (err) => {
                console.log(err);
                $q.reject(err);
            }).then(data => {
                if (data != null) {
                    imageData = data;
                    return 'data:image/jpeg;base64,' + imageData;
                }
            });
        }
    };
};
