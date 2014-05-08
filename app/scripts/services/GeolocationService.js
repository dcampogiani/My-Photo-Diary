angular.module('MyPhotoDiary.services')

    .service('GeolocationService', function($q){

        var _options = { enableHighAccuracy : true };

        var _getCurrentPosition = function(){

            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (error) {
                    deferred.reject(error);
                },
                _options
            );

            return deferred.promise;

        };

        return {
            getCurrentPosition : _getCurrentPosition
        };

    });