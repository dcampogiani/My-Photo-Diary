angular.module('MyPhotoDiary.controllers')

    .controller('SettingsController', function($scope, PicturesService ){

        $scope.howManyPictures = function() {

            return PicturesService.getAllPictures().length;

        };

        $scope.deleteAll = function(){
            return PicturesService.deleteAllPictures();
        };

        $scope.fakeOnePicture = function(){

            var _toSave = { description: 'testDest', url : 'http://3.bp.blogspot.com/-aPLJcAFLy40/UIVn9AMfxJI/AAAAAAAAAII/5YAW0aY2938/s1600/vieri-inter.jpeg', latitude : '11', longitude : '12' };

            PicturesService.savePicture(_toSave);
        };


        $scope.getCurrentPicturesJSON = function(){

            return angular.toJson(PicturesService.getAllPictures());

        };

    });