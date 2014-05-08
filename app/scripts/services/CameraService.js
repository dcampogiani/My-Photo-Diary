angular.module('MyPhotoDiary.services')

    .service('CameraService', function($q){

        var _options = { quality : 100,
            //destinationType : Camera.DestinationType.FILE_URI,
            destinationType : 1,
            //sourceType : Camera.PictureSourceType.CAMERA,
            sourceType : 1,
            allowEdit : true,
            correctOrientation : true,
            saveToPhotoAlbum: false };

        var _takePicture = function(){

            var deferred = $q.defer();

            navigator.camera.getPicture(
                function (imageURI) {
                    deferred.resolve(imageURI);
                },
                function (message) {
                    deferred.reject(message);
                },
                _options
            );
            return deferred.promise;

        };

        return {
            takePicture : _takePicture
        }

    });