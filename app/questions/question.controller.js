'use strict';

(function() {

     function QuestionController($rootScope, $location, QuestionService) {
       var vm = this;

       vm.init = function() {
          QuestionService.getAll().$promise.then(function(result) {
            vm.questions = result;
          });
       };

       vm.openPoll = function(question) {
         $rootScope.currentQuestion = question;
         $location.path('/poll/' + question.objectId);
       };

       vm.init();

     }

 angular
   .module('pollApp')
   .controller('QuestionController', ['$rootScope', '$location', 'QuestionService', QuestionController]);

 })();