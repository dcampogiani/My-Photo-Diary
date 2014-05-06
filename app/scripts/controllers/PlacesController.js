angular.module('MyPhotoDiary.controllers')

    .controller('PlacesController', function($scope, GeolocationService){

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };
    });