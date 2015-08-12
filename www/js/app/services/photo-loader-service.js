"use strict";

module.exports = /*@ngInject*/ function(httpService, QueuePhotosLoaderModel,
    PhotoUploadModel, photosBoxService, storageService) {

    var queuePhotos = new QueuePhotosLoaderModel();
    var flagStartLoading = false;

    function loadPhotos() {
        console.log('Size-1', queuePhotos.size());

        if (queuePhotos.isNotEmpty()) {
            var photoUpload = queuePhotos.shift();
            console.log(photoUpload);
            console.log('Size-2', queuePhotos.size());
            
            var stateLoading = photoUpload.stateLoading;
            stateLoading.loading();

            httpService.getPhotoByUrl(photoUpload.photoUrl).then(data => {
                photoUpload.photoData = data;
                stateLoading.loaded();
                console.log('---------1');

            }).then(() => {
                var photosStorage = photosBoxService.getBox();
                //handlerSaveInStorage(photosStorage);
                console.log('---------2');
            }).catch((e) => {
                console.log(e);
                stateLoading.notLoaded();
                queuePhotos.push(photoUpload);
            }).then(() => {
                console.log('---------3');
                loadPhotos();
            });
        } else {
            flagStartLoading = false;
        }
    }

    function startLoading() {
        if (!flagStartLoading) {
            flagStartLoading = true;
            loadPhotos();
        }
    }

    function setPhotoInBox(photo) {
        var messageId = photo.messageId;
        var photoUpload = new PhotoUploadModel(photo);

        photosBoxService.setPhoto(messageId, photoUpload);
    }

    function setArrayPhotosInBox(arrayPhotos) {
        arrayPhotos.forEach(photo => {
            setPhotoInBox(photo);
        });
    }

    function handlerLoadPhoto(messageId) {
        queuePhotos.up(messageId);
        startLoading();
    }

    function handlerSaveInStorage() {
        var photosStorage = photosBoxService.getBoxFormatStorage();
        storageService.setPhotosBox(photosStorage);
    }

    function handlerClearStorage() {
        storageService.clearPhotosBox();
    }

    return {
        start() {
            storageService.getPhotosBox().then(photosStorage => {
                console.log('MEssageBOX STORE', photosStorage);

                if (photosStorage != null) {
                    setArrayPhotosInBox(photosStorage);

                    var notLoadedPhotos = photosBoxService.getNoLoadedPhotos();

                    notLoadedPhotos.forEach(photoUpload => {
                        queuePhotos.push(photoUpload);
                    });
                }
            }).then(() => {
                startLoading();
            });

            photosBoxService.on('load-photo', handlerLoadPhoto);
            photosBoxService.on('save-in-storage', handlerSaveInStorage);
            photosBoxService.on('clear-storage', handlerClearStorage);
        },

        finish() {
            photosBoxService.off('load-photo', handlerLoadPhoto);
            photosBoxService.off('save-in-storage', handlerSaveInStorage);
            photosBoxService.off('clear-storage', handlerClearStorage);
            queuePhotos.clear();
        },

        setPhotoInQueueLoader(message) {
            console.log('SerPhoto', message);
            
            var messageId = message.id;
            var photoUpload = new PhotoUploadModel(message);

            photosBoxService.setPhoto(messageId, photoUpload);
            queuePhotos.push(photoUpload);

            startLoading();
        }
    };
};

