angular.module('MyPhotoDiary.services')

    .service('PicturesService', function($rootScope, $q, StorageService){

        var _all = [];

        var picturesString = window.localStorage['pictures'];
        if(picturesString) {
            _all =  angular.fromJson(picturesString);
        }

        var _getAllPictures = function(){

            return _all;

        };

        var _savePicture = function(toSave){

            _getAllPictures().unshift(toSave);
            window.localStorage['pictures'] = angular.toJson(_all);
            $rootScope.$broadcast("NewPicture");



        };

        var _getPictures = function(fromIndex, howMany){

            if (fromIndex>=0 && howMany>=1){

                return  _getAllPictures().slice(fromIndex,fromIndex+howMany);

            }

            return false;
        };

        var _deletePicture = function(toDelete){

            var all = _getAllPictures();
            var deferred = $q.defer();

            for (var i=0;i<all.length;i++){

                if (all[i].url==toDelete.url){

                    StorageService.deletePicture(toDelete.url).then(

                        function(result){

                            all.splice(i,1);
                            _all=all;
                            window.localStorage['pictures'] = angular.toJson(_all);
                            deferred.resolve(result);

                        },
                        function(error){

                            deferred.reject(error);

                        });

                    return deferred.promise;

                }
            }

        };

        var _deleteAllPictures = function(){

            var _old = _getAllPictures();
            var _len = _old.length;
            var deferred = $q.defer();

            for (var i=0;i<_len;i++)
            {
                StorageService.deletePicture(_old[i].url).then(
                    function(result){

                    },
                    function(error){

                        deferred.reject(error);
                        return deferred.promise;
                    });
            }

            window.localStorage['pictures'] = [];
            _all =[];
            deferred.resolve('Pictures deleted');
            return deferred.promise;

        };

        return{
            getAllPictures : _getAllPictures,
            savePicture : _savePicture,
            getPictures : _getPictures,
            deleteAllPictures : _deleteAllPictures,
            deletePicture : _deletePicture
        }

    });