'use strict';

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'MyPhotoDiary' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('MyPhotoDiary.services',[]);

angular.module('MyPhotoDiary.controllers',['MyPhotoDiary.services']);

angular.module('MyPhotoDiary', ['ionic','MyPhotoDiary.controllers','MyPhotoDiary.services','google-maps'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })



    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })
            .state('tabs.places', {
                url: "/places",
                views: {
                    'places-tab': {
                        templateUrl: "templates/places.html",
                        controller: 'PlacesController'
                    }
                }
            })
            .state('tabs.timeline', {
                url: "/timeline",
                views: {
                    'timeline-tab': {
                        templateUrl: "templates/timeline.html",
                        controller: 'TimelineController'
                    }
                }
            })
            .state('tabs.settings', {
                url: "/settings",
                views: {
                    'settings-tab': {
                        templateUrl: "templates/settings.html",
                        controller: 'SettingsController'
                    }
                }
            });

        $urlRouterProvider.otherwise("/tab/timeline");

    });
