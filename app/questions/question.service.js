'use strict';

(function() {

     function QuestionService($resource, appConfig) {
        return $resource('https://api.parse.com/1/classes/Question', {}, {
            'get': {
                method:'GET',
                isArray: false,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data.results[0];
                }
            },
           'getAll': {
            method:'GET',
            isArray:true,
            transformResponse: function (data) {
              data = angular.fromJson(data);
              return data.results;
            }
          }
        });
     };

 angular
   .module('pollApp')
   .factory('QuestionService', ['$resource', 'appConfig', QuestionService]);

 })();