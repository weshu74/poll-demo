'use strict';

(function () {

  function OptionController($scope, $rootScope, $routeParams, QuestionService, ResultService, OptionService) {
    var vm = this;

    vm.init = function () {
      var questionId = $routeParams.questionId;

      if (!$rootScope.currentQuestion) {
        QuestionService.get({'where': angular.toJson({objectId: questionId})}).$promise.then(function (result) {
          $rootScope.currentQuestion = result;
          vm.question = $rootScope.currentQuestion;
        });

      } else {
        vm.question = $rootScope.currentQuestion;

      }



      OptionService.get({'where': angular.toJson({question_id: questionId})}).$promise.then(function (result) {
        vm.options = result;
      });
    };

    vm.vote = function () {
      console.log('-------------- vote!' + vm.question.objectId + " " + $scope.selectedOptionId);

      ResultService.save({"question_id": vm.question.objectId, "option_id":  $scope.selectedOptionId});

    };

    vm.init();

  }

  angular
    .module('pollApp')
    .controller('OptionController', ['$scope', '$rootScope', '$routeParams', 'QuestionService', 'ResultService', 'OptionService', OptionController]);

})();