'use strict';

(function() {
    angular
        .module('pollApp')
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/poll/:questionId', {
            templateUrl: 'app/options/option.html',
            controller: 'OptionController',
            controllerAs: 'optionCtrl'
          });
        }]
        );
})();