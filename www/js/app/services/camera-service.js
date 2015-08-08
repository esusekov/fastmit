"use strict";

module.exports = /*@ngInject*/ function($cordovaCamera, $q) {
    var imageData = '';

    return  {
        makePhoto(options) {

            var defaultOptions = {
                //quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                //sourceType: Camera.PictureSourceType.CAMERA,
                //allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                //targetWidth: 100,
                //targetHeight: 100,
                //popoverOptions: CameraPopoverOptions,
                //saveToPhotoAlbum: false
            };

            return $cordovaCamera.getPicture(options || defaultOptions).then((data) => {
                console.log(data);
                imageData = data;
                return data;
            }, (err) => {
                console.log(err);
                $q.reject(err);
            }).then(data => {
                if (data != null) {
                    return 'data:image/jpeg;base64,' + data;
                }
            });
        }
    };
};
