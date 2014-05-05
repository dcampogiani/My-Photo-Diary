angular.module('MyPhotoDiary.controllers')

    .controller('SettingsController', function($scope, PicturesService, SettingsService ){

        $scope.settings = {};

        $scope.settings.howManyPicturesToFetch = SettingsService.getHowManyPicturesToFetch();

        $scope.howManyPictures = function() {

            return PicturesService.getAllPictures().length;

        };

        $scope.saveSettings = function() {
            return SettingsService.setHowManyPicturesToFetch($scope.settings.howManyPicturesToFetch);
        };

        $scope.deleteAll = function(){
            return PicturesService.deleteAllPictures();
        };

        $scope.getCurrentPicturesJSON = function(){

            return angular.toJson(PicturesService.getAllPictures());

        };

    });