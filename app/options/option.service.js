'use strict';

(function() {

     function OptionService($resource, appConfig) {
        return $resource('https://api.parse.com/1/classes/Option', {}, {
            'get': {
               method:'GET',
               isArray:true,
               transformResponse: mapResponseToResult
            }
        });

     };

     function mapResponseToResult(data) {
        data = angular.fromJson(data);
        return data.results;
     }

 angular
   .module('pollApp')
   .factory('OptionService', ['$resource', 'appConfig', OptionService]);

 })();

