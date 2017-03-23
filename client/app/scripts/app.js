'use strict';
// ngResource module and the provider $urlRouterProvider for configuring routes
angular.module('weatherApp', ['ui.router', 'ngResource'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        // route for the home page
        .state('app', {
            url: '/',
            views: {
                'header': {
                    // Header PAge
                    templateUrl: 'views/header.html',
                },
                'content': {
                    // Landing page of the Single Page Application
                    // Gets Weather data from JSON Object in controller
                    templateUrl: 'views/wunderweather.html',
                    controller: 'wunderWeatherController'
                },
                'footer': {
                    // Footer Page
                    templateUrl: 'views/footer.html',
                }
            }

        })
        // route for the wunder weather page
        .state('app.myweather', {
            url: 'myweather',
            views: {
                'content@': {
                  // Gets data from Wunderground API
                    templateUrl: 'views/weather.html',
                    controller: 'weatherController'
                }
            }
        })
        // route for the wunder weather page
        .state('app.readme', {
            url: 'readme',
            views: {
                'content@': {
                    // Gets Weather data from JSON Object in controller
                    templateUrl: 'views/readme.html',
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    });
