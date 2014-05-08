angular.module('MyPhotoDiary.controllers')

    .controller('PlacesController', function($scope, $state, $ionicPopup, GeolocationService, PicturesService){

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

        var _markers = [];

        var _pictures = PicturesService.getAllPictures();

        var _len = _pictures.length;

        for(var i=0;i<_len;i++){
            var _marker = {latitude: _pictures[i].latitude, longitude: _pictures[i].longitude, options: {icon: { url: _pictures[i].url, scaledSize: { height: 75, width: 75} } } };
            _markers.push(_marker);
        }

        $scope.markers = _markers;


        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });


        $scope.$on('NewPicture', function() {

            $state.go('tabs.timeline');

        });

    });