angular.module('MyPhotoDiary.services')

    .service('PicturesService', function(){

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

        };

        var _getPictures = function(fromIndex, howMany){

            if (fromIndex>=0 && howMany>=1){

                return  _getAllPictures().slice(fromIndex,fromIndex+howMany);

            }

            return false;
        };

        var _deletePicture = function(toDelete){

            var all = _getAllPictures();

            for (var i=0;i<all.length;i++){

                if (all[i].url==toDelete.url){
                    _all=all;
                    break;
                }
            }

        };

        var _deleteAllPictures = function(){

            window.localStorage['pictures'] = [];
            _all =[];
            //TODO delete also from disk


        };

        return{
            getAllPictures : _getAllPictures,
            savePicture : _savePicture,
            getPictures : _getPictures,
            deleteAllPictures : _deleteAllPictures,
            deletePicture : _deletePicture
        }

    });