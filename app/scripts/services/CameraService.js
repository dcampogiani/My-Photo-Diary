angular.module('MyPhotoDiary.services')

    .service('CameraService', function($q){

        //TODO read from settings wanted quality

        var _options = { quality : 100,
            //destinationType : Camera.DestinationType.FILE_URI,
            destinationType : 1,
            //sourceType : Camera.PictureSourceType.CAMERA,
            sourceType : 1,
            allowEdit : true,
            correctOrientation : true,
            saveToPhotoAlbum: false };

        var _service = {

            camera: navigator.camera,
            take: function () {

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
            }
        };
        return _service;



    });