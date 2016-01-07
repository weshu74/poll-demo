'use strict';

(function() {
    angular
        .module('pollApp', ['ngSanitize','ngResource', 'ngRoute'])
        .constant('appConfig', {
            'parseAppId': 'S8jEttKmQZNymdZt2t0G3jtwqzcUGnWUL2OFeoME',
            'parseRestApiId': 'hoqySFZcgLD5LYid4u2daPcPhoIsVgQjPNNebgJq',
            'streamdataioAppToken': 'NTJhYzdhMWYtZjZhZi00Y2I5LWJlY2QtMjZiM2E0MDFhN2Ix',
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
