angular.module('MyPhotoDiary.controllers')

    .controller('TimelineController', function($scope, PicturesService, SettingsService){

        var _picturesToFetch = function(){ return SettingsService.getHowManyPicturesToFetch()};

        $scope.pictures = PicturesService.getPictures(0,_picturesToFetch());

        var _lastIndex = _picturesToFetch()-1;

        var _thereAreMorePictures = true;

        $scope.canLoadMorePictures = function() { return _thereAreMorePictures};

        $scope.loadMore = function() {

            if (_thereAreMorePictures){


                var _toAdd = PicturesService.getPictures(_lastIndex+1,_picturesToFetch());


                if (_toAdd) {

                    if (_toAdd.length < _picturesToFetch())
                        _thereAreMorePictures = false;


                    _lastIndex = _lastIndex + _toAdd.length;

                    for (var i=0;i<_toAdd.length;i++)
                    {
                        $scope.pictures.push(_toAdd[i]);
                    }

                }

                else _thereAreMorePictures=false;
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');

        };

        $scope.deletePhoto = function(toDelete, index) {

            //TODO show popup

            PicturesService.deletePicture(toDelete);

            $scope.pictures.splice(index,1);

        };

        $scope.sharePhoto = function(toShare) {

            return window.plugins.socialsharing.share(null, null, toShare.url, null);
        };

        $scope.$on('NewPicture', function() {

            var _newPictureArray = PicturesService.getPictures(0,1);

            if (_newPictureArray.length==1)
                $scope.pictures.unshift(_newPictureArray[0]);

        });

    });