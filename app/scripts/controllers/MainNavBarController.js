angular.module('MyPhotoDiary.controllers')

    .controller('MainNavBarController', function($scope, $ionicModal, $ionicPopup, CameraService, GeolocationService, PicturesService, StorageService){

        var beforeCamera,afterCamera,beforeSaving,afterSaving;

        $ionicModal.fromTemplateUrl('templates/confirmPhoto.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.capturePicture = function() {

            beforeCamera= new Date().getTime();

            CameraService.takePicture().then(

                function(photoResult){ //photo taken

                    afterCamera = new Date().getTime();

                    GeolocationService.getCurrentPosition().then(

                        function(locationResult){// position taken

                            $scope._newPicture = { description: '', url : photoResult, latitude : locationResult.coords.latitude, longitude : locationResult.coords.longitude  };

                            $scope.modal.show();
                        },

                        function(locationError){//position error
                            $ionicPopup.alert({
                                title: 'Error',
                                content: locationError,
                                okType: 'button-assertive'
                            }).then(function(res) {
                            });
                        });

                },

                function(photoError){//photo error
                    $ionicPopup.alert({
                        title: 'Error',
                        content: photoError,
                        okType: 'button-assertive'
                    }).then(function(res) {
                    });
                });

        };

        $scope.saveNewPhoto = function(){

            beforeSaving = new Date().getTime();

            StorageService.movePicture($scope._newPicture.url).then(

                function(result){
                    $scope._newPicture.url = result;
                    PicturesService.savePicture($scope._newPicture);
                    afterSaving = new Date().getTime();
                    $scope._newPicture = {};
                    console.log("MyPhotoDiary Before Camera: "+beforeCamera + " After Camera "+ afterCamera + " Before Saving: "+beforeSaving + " After Saving: "+ afterSaving);
                },

                function(error){
                    $ionicPopup.alert({
                        title: 'Error',
                        content: error,
                        okType: 'button-assertive'
                    }).then(function(res) {
                    });
                });



            $scope.modal.hide();




        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

    });