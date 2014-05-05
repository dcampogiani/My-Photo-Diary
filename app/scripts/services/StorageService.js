angular.module('MyPhotoDiary.services')

    .service('StorageService', function($q){

        var _fileSystem = false;

        var deferred;

        var  _movePicture = function(tempPicturePath){
            deferred = $q.defer();
            window.resolveLocalFileSystemURL(tempPicturePath, _resolveOnSuccess, _resOnError);
            return deferred.promise;
        };

        var _resolveOnSuccess =  function(entry){

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
                    //The folder is created if doesn't exist

                    if (!_fileSystem)
                        _fileSystem=fileSys;

                    _fileSystem.root.getDirectory( 'Pictures/MyPhotoDiary', {create:true, exclusive: false},
                        function(directory) {
                            entry.moveTo(directory, entry.name,  _successMove, _resOnError);
                        },
                        _resOnError);
                },
                _resOnError);
        };



        var _successMove = function(entry) {

            if (_fileSystem){
                var _newUrl = entry.toURL();
                deferred.resolve(_newUrl);
            }

            else(deferred.reject('Filesystem not ready'));


        };

        var _resOnError = function(error) {
            deferred.reject(error.code);
        };

        var _deletePicture = function(toDelete){
            //TODO to implement
        };

        return{
            movePicture : _movePicture,
            deletePicture : _deletePicture
        }

    });