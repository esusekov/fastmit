"use strict";

module.exports = /*@ngInject*/ function(httpService, QueuePhotosLoaderModel,
    PhotoUploadModel, photosBoxService, storageService, eventer, encryptionService) {

    var queuePhotos = new QueuePhotosLoaderModel();
    var flagStartLoading = false;

    function loadPhotos() {
        console.log('Queue', queuePhotos);

        if (queuePhotos.isNotEmpty()) {
            var photoUpload = queuePhotos.shift();

            var stateLoading = photoUpload.stateLoading;
            stateLoading.loading();

            httpService.getPhotoByUrl(photoUpload.photoUrl).then(response => {
                console.log('GET PHOTO BY URL', response, photoUpload);
                var photoData = response.data.data;
                var encodedPassPhrase = photoUpload.encodedPassPhrase;
                photoUpload.photoData = encryptionService.decryptPhoto(encodedPassPhrase, photoData);

                stateLoading.loaded();
            }).catch((e) => {
                console.log('Error', e);
                
                stateLoading.notLoaded();
                //queuePhotos.push(photoUpload);
            }).then(() => {
                var photosStorage = photosBoxService.getBox();
                handlerSaveInStorage(photosStorage);

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

    function handlerLoadPhoto(messageId) {
        console.log('LOad Photo', messageId);
        
        queuePhotos.pickUp(messageId);
        startLoading();
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

    function handlerSaveInStorage() {
        console.log('Save In Storage Photos');
        
        var photosStorage = photosBoxService.getBoxFormatStorage();
        storageService.setPhotosBox(photosStorage);
    }

    function handlerClearStorage() {
        storageService.clearPhotosBox();
    }

    function handlerRemovePhoto(messageId) {
        console.log('Remove photo');

        photosBoxService.removePhotoById(messageId);
    }

    return {
        start() {
            return storageService.getPhotosBox().then(photosStorage => {
                console.log('Photos Box STORE', photosStorage);

                if (photosStorage != null) {
                    setArrayPhotosInBox(photosStorage);

                    var notLoadedPhotos = photosBoxService.getNoLoadedPhotos();
                    
                    console.log('Notloaded', notLoadedPhotos);

                    console.log('QUEUE PHOTOS 1', queuePhotos.size());
                    notLoadedPhotos.forEach(photoUpload => {
                        queuePhotos.push(photoUpload);
                    });
                }
            }).then(() => {
                startLoading();

                photosBoxService.on('save-in-storage', handlerSaveInStorage);
                photosBoxService.on('clear-storage', handlerClearStorage);
                eventer.on('load-photo', handlerLoadPhoto);
                eventer.on('remove-photo', handlerRemovePhoto);
            });
        },

        stop() {
            photosBoxService.off('save-in-storage', handlerSaveInStorage);
            photosBoxService.off('clear-storage', handlerClearStorage);
            eventer.off('load-photo', handlerLoadPhoto);
            eventer.off('remove-photo', handlerRemovePhoto);
            queuePhotos.clear();
        },

        setPhotoInQueueLoader(message) {
            var messageId = message.messageId;

            if (photosBoxService.hasPhotoById(messageId)) {
                return;
            }
            console.log('SET PHOTO IN QUEUE LOADER', message);
            var photoUpload = new PhotoUploadModel(message);

            photosBoxService.setPhoto(messageId, photoUpload);
            queuePhotos.push(photoUpload);

            startLoading();
        }
    };
};

