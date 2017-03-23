'use strict';
//Service to inject data dependencies into controller, make a restful api call on weatheu
angular.module('weatherApp')
  .constant('baseURL','http://localhost:3010/')
.service('weatherFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    this.getWeather = function(zipcode) {
        console.log(baseURL + 'forecast?' + zipcode);
        return $resource(baseURL + 'forecast?' + zipcode);
    };
    this.getCityName = function(zipcode){
      console.log(baseURL + 'search?' + zipcode);
      return $resource(baseURL + 'search?' + zipcode);
    };
}])

;
