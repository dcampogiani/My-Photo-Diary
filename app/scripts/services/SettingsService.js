angular.module('MyPhotoDiary.services')

    .service('SettingsService', function(){

        var _settings = {};
        var _settingsString = window.localStorage['settings'];
        if(_settingsString) {
            _settings =  angular.fromJson(_settingsString);
        }

        else {
            _settings.howManyPicturesToFetch = 10;
        }


        var _getHowManyPicturesToFetch = function() {
            return _settings.howManyPicturesToFetch;
        };

        var _setHowManyPicturesToFetch = function(value){
            if (value>=1){
                _settings.howManyPicturesToFetch = value;
                _saveSettings();
            }
        };

        var _saveSettings = function(){
            window.localStorage['settings'] = angular.toJson(_settings);
        };


        return{
            getHowManyPicturesToFetch : _getHowManyPicturesToFetch,
            setHowManyPicturesToFetch : _setHowManyPicturesToFetch
        }

    });