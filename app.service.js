'use strict';

(function() {

     function ParseInterceptor(appConfig, $q) {
        return {
           request: function(config) {
            config.headers = config.headers || {};
            config.headers['X-Parse-Application-ID'] = appConfig.parseAppId;
            config.headers['X-Parse-REST-API-Key'] = appConfig.parseRestApiId;
            return config;
           },
           response: function(response) {
            return response || $q.when(response);
           }
        };
     };

 angular
   .module('pollApp')
   .factory('ParseInterceptor', ['appConfig', '$q', ParseInterceptor]);

 })();