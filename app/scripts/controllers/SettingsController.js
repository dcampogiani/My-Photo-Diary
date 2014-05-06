angular.module('MyPhotoDiary.controllers')

    .controller('SettingsController', function($scope, $ionicPopup, PicturesService, SettingsService ){

        $scope.settings = {};

        $scope.settings.howManyPicturesToFetch = SettingsService.getHowManyPicturesToFetch();

        $scope.howManyPictures = function() {

            return PicturesService.getAllPictures().length;

        };

        $scope.saveSettings = function() {
            SettingsService.setHowManyPicturesToFetch($scope.settings.howManyPicturesToFetch);
        };

        $scope.deleteAll = function(){


            var _confirmPopup = $ionicPopup.confirm({
                title: 'Please confirm',
                template: 'Are you sure you want to delete all pictures ?',
                okText: 'Delete',
                okType: 'button-assertive'
            });
            _confirmPopup.then(function(res) {
                if(res) {
                    return PicturesService.deleteAllPictures().then(

                        function(result){

                        },function(error){
                            $ionicPopup.alert({
                                title: 'Error',
                                content: error,
                                okType: 'button-assertive'
                            }).then(function(res) {
                            });
                        });
                }
            });



        };

        $scope.getCurrentPicturesJSON = function(){

            return angular.toJson(PicturesService.getAllPictures());

        };


    });