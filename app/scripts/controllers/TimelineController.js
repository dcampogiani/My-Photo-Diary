angular.module('MyPhotoDiary.controllers')

    .controller('TimelineController', function($scope, PicturesService){

        //TODO read setting to decide how many pictures retrieve, to date is 1

        $scope.pictures = PicturesService.getPictures(0,1);

        var _lastIndex = 0;

        var _thereAreMorePictures = true;

        $scope.canLoadMorePictures = function() { return _thereAreMorePictures};

        $scope.loadMore = function() {

            if (_thereAreMorePictures){

                var _toAdd = PicturesService.getPictures(_lastIndex+1,1);

                if (_toAdd) {

                    if (_toAdd.length < 1)
                        _thereAreMorePictures = false;

                    _lastIndex = _lastIndex + 1;

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