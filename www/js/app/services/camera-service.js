"use strict";

module.exports = /*@ngInject*/ function($cordovaCamera, $q) {

    var imageData = '';

    var defaultOptions = {
        //quality: 50,
        //destinationType: Camera.DestinationType.DATA_URL,
        //sourceType: Camera.PictureSourceType.CAMERA,
        //allowEdit: true,
        //encodingType: Camera.EncodingType.JPEG,
        //targetWidth: 100,
        //targetHeight: 100,
        //popoverOptions: CameraPopoverOptions,
        //saveToPhotoAlbum: false
    };

    return  {
        makePhoto(options) {
            return $cordovaCamera.getPicture(options || defaultOptions).then((data) => {
                console.log(data);
                imageData = data;
                return data;
            }, (err) => {
                console.log(err);
                $q.reject(err);
            });
        }
    }
};
