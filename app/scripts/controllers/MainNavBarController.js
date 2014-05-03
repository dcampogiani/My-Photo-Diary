angular.module('MyPhotoDiary.controllers')

    .controller('MainNavBarController', function($scope, $ionicModal, CameraService, GeolocationService, PicturesService){

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
                            //TODO show popop with error
                        });

                },

                function(photoError){//photo error
                    //TODO show popop with error
                });

        };

        $scope.saveNewPhoto = function(){

            PicturesService.savePicture($scope._newPicture);

            $scope.modal.hide();

            $scope._newPicture = {};

            $scope.$parent.$broadcast('NewPicture');


        };

        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

    });