'use strict';

(function() {
    angular
        .module('pollApp')
        .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/poll', {
            templateUrl: 'app/questions/question.html',
            controller: 'QuestionController',
            controllerAs: 'questionCtrl'
          });
        }]
        );
})();