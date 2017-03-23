'use strict';
// Controler for the DOM elements
angular.module('weatherApp')
// Controller to fetch data from wunderground.com
.controller('wunderWeatherController', ['$scope', 'weatherFactory', function($scope, weatherFactory) {
            $scope.showForecast = false;
            $scope.message = 'Loading ...';
            $scope.zipcode = '60203';
            $scope.forecasts = '';

            var getCityName = function () {
              $scope.message = 'Loading ...';
              weatherFactory.getCityName($scope.zipcode).get().$promise
              .then(
                  function(response) {
                    console.log(response);
                    if(response.RESULTS.length>0){
                      $scope.message = response.RESULTS[0].name;
                    }else {
                        $scope.message = 'No Results Found.';
                    }
                  },
                  function(response) {
                    $scope.message = 'Error: ' + response.error.description + ' ' + response.error.type;
                    console.log(response);
                  }
              );
            };

            var getWeather = function () {
              $scope.message = 'Loading ...';
              weatherFactory.getWeather($scope.zipcode).get().$promise
              .then(
                  function(response) {
                    console.log(response);
                    $scope.forecasts = response.forecast.simpleforecast.forecastday;
                    $scope.showForecast = true;
                  },
                  function(response) {
                    var errorMessage = response.statusText;
                    if(response.status === -1){
                      errorMessage = 'Network Error, Server down.';
                    }
                    $scope.message = 'Error: '+response.status + ' ' + errorMessage;
                    console.log(response);
                  }
              );
            };

            $scope.message = getCityName();
            $scope.forecasts = getWeather();

            $scope.checkWeather = function () {
              $scope.message = getCityName();
              $scope.forecasts = getWeather();
            };
        }])

// Controller to fetch static weather data
.controller('weatherController', ['$scope', function($scope) {
            $scope.message = 'Weather Forecast from static JSON object .... ';
            $scope.forecasts = [
              {
                'weekday': 'WED',
                'icon_url':'http://icons.wxug.com/i/c/k/clear.gif',
                'monthname': 'March',
                'day':'23',
                'year':'2017',
                'conditions':'Clear',
                'high':'42',
                'low':'20'
              },
              {
                'weekday': 'THU',
                'icon_url':'http://icons.wxug.com/i/c/k/clear.gif',
                'monthname': 'March',
                'day':'24',
                'year':'2017',
                'conditions':'Clear',
                'high':'42',
                'low':'20'
              },
              {
                'weekday': 'FRI',
                'icon_url':'http://icons.wxug.com/i/c/k/clear.gif',
                'monthname': 'March',
                'day':'25',
                'year':'2017',
                'conditions':'Clear',
                'high':'42',
                'low':'20'
              },
              {
                'weekday': 'SAT',
                'icon_url':'http://icons.wxug.com/i/c/k/clear.gif',
                'monthname': 'March',
                'day':'26',
                'year':'2017',
                'conditions':'Clear',
                'high':'42',
                'low':'20'
              }
            ];
            console.log($scope.forecasts);
        }])
;
