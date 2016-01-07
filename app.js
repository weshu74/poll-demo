'use strict';

(function() {
    angular
        .module('pollApp', ['ngSanitize','ngResource', 'ngRoute'])
        .constant('appConfig', {
            'parseAppId': 'S8jEttKmQZNymdZt2t0G3jtwqzcUGnWUL2OFeoME',
            'parseRestApiId': 'hoqySFZcgLD5LYid4u2daPcPhoIsVgQjPNNebgJq',
            'streamdataioAppToken': '[YOUR STREAMDATA.IO APP TOKEN]',
        })
        .config(function($httpProvider) {
           $httpProvider.interceptors.push('ParseInterceptor');
        })
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.otherwise({
            redirectTo: '/poll'
          });
        }]);
})();
