angular.module('MyPhotoDiary.controllers')

    .controller('PlacesController', function($scope, $ionicPopup, $ionicModal, GeolocationService, PicturesService){

        $ionicModal.fromTemplateUrl('templates/singlePhoto.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        var _mapOptions = {keyboardShortcuts: false, panControl: false, zoomControl: false, streetViewControl: false};

        $scope.map = {zoom:15, options : _mapOptions };

        var _lastCenterString = window.localStorage['lastCenter'];
        if(_lastCenterString) {
            $scope.map.center =  angular.fromJson(_lastCenterString);
        }

        GeolocationService.getCurrentPosition().then(

            function(position){

                var _currentCenter = { latitude: position.coords.latitude,  longitude:position.coords.longitude};

                $scope.map.center = _currentCenter;

                window.localStorage['lastCenter'] = angular.toJson(_currentCenter);

            }, function(error){
                $ionicPopup.alert({
                    title: 'Error',
                    content: error.message,
                    okType: 'button-assertive'
                }).then(function(res) {
                });
            });

        var _pictures = PicturesService.getAllPictures();

        var _len = _pictures.length;

        for(var i=0;i<_len;i++){
            _pictures[i].options = {animation: google.maps.Animation.DROP, icon: { url: _pictures[i].url, scaledSize: { height: 100, width: 100} } };
        }

        $scope.pictures = _pictures;

        $scope.onPictureSelected = function($markerModel){
            //alert($markerModel.description);

            $scope.selectedPicture = $markerModel;
            $scope.modal.show();

            //$state.go('tabs.timeline');
        };

        $scope.deletePhoto = function(toDelete) {

            var _confirmPopup = $ionicPopup.confirm({
                title: 'Please confirm',
                template: 'Are you sure you want to delete '+toDelete.description+'?',
                okText: 'Delete',
                okType: 'button-assertive'
            });

            _confirmPopup.then(function(res) {
                if(res) {
                    PicturesService.deletePicture(toDelete).then(

                        function(result){
                            //TODO remove from map
                            //$scope.pictures.splice(index,1);

                            $scope.modal.hide();

                        },
                        function(error){
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


        $scope.sharePhoto = function(toShare) {

            window.plugins.socialsharing.share(null, null, toShare.url, null);
            $scope.modal.hide();
        };


        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });

    });