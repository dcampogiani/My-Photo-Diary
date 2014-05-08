angular.module('MyPhotoDiary.controllers')

    .controller('MainNavBarController', function($scope, $ionicModal, $ionicPopup, CameraService, GeolocationService, PicturesService, StorageService){

        $ionicModal.fromTemplateUrl('templates/confirmPhoto.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.capturePicture = function() {

            CameraService.takePicture().then(

                function(photoResult){ //photo taken

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

            StorageService.movePicture($scope._newPicture.url).then(

                function(result){
                    $scope._newPicture.url = result;
                    PicturesService.savePicture($scope._newPicture);
                    $scope._newPicture = {};
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