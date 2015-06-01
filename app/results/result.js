'use strict';

(function() {
    angular
        .module('pollApp')
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/poll/:questionId/result', {
            templateUrl: 'app/results/result.html',
            controller: 'ResultController',
            controllerAs: 'resultCtrl'
          });
        }]
        );
})();