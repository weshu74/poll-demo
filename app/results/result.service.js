'use strict';

(function() {

     function ResultService($resource, $q, OptionService) {
        return {
          getPoll: function(questionId) {
            var deferred = $q.defer();
            var param = {question_id: questionId};
            var jsonParam = angular.toJson(param);

            OptionService.get({'where': jsonParam}).$promise.then(function(options) {
                $resource('https://api.parse.com/1/classes/Vote?where=' + jsonParam).get().$promise.then(function(votes) {
                  var optionsMap = {};

                  options.forEach(function(option){
                    optionsMap[option.objectId] = { label: option.Title, value: 0 };
                  });

                  votes.results.forEach(function(vote){
                    optionsMap[vote.option_id].value++;
                  });

                  var results = [];
                  for(var option in optionsMap) {
                    results.push(optionsMap[option]);
                  }

                  deferred.resolve(results);
                });
            });

            return deferred.promise;
          },
          save: function(body) {
            return $resource('https://api.parse.com/1/classes/Vote').save(body);
          }
        }
     };

 angular
   .module('pollApp')
   .factory('ResultService', ['$resource', '$q', 'OptionService', ResultService]);

 })();

