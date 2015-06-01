'use strict';

(function() {
    angular
        .module('pollApp', ['ngSanitize','ngResource', 'ngRoute'])
        .constant('appConfig', {
            'parseAppId': '[YOUR PARSE APP ID]',
            'parseRestApiId': '[YOUR PARSE REST API ID]'
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
