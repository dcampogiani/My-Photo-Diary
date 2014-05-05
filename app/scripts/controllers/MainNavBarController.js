angular.module('MyPhotoDiary.controllers')

    .controller('MainNavBarController', function($scope, $ionicModal, CameraService, GeolocationService, PicturesService, StorageService){

        $ionicModal.fromTemplateUrl('templates/confirmPhoto.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.capturePicture = function() {

            CameraService.take().then(

                function(photoResult){ //photo taken

                    GeolocationService.getCurrentPosition().then(

                        function(locationResult){// position taken

                            $scope._newPicture = { description: '', url : photoResult, latitude : locationResult.coords.latitude, longitude : locationResult.coords.longitude  };

                            $scope.modal.show();
                        },

                        function(locationError){//position error
                            //TODO show popup with error
                        });

                },

                function(photoError){//photo error
                    //TODO show popup with error
                });

        };

        $scope.saveNewPhoto = function(){

            StorageService.movePicture($scope._newPicture.url).then(

                function(result){
                    $scope._newPicture.url = result;
                    PicturesService.savePicture($scope._newPicture);
                    $scope._newPicture = {};

                    $scope.$parent.$broadcast('NewPicture');
                },

                function(error){
                    //TODO show popup with error
                });



            $scope.modal.hide();




        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

    });