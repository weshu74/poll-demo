'use strict';

(function () {

  function OptionController($scope, $rootScope, $routeParams, QuestionService, ResultService, OptionService) {
    var vm = this;

    vm.init = function () {
      var questionId = $routeParams.questionId;

      if (!$rootScope.currentQuestion) {
        QuestionService.get({'where': angular.toJson({objectId: questionId})}).$promise
          .then(function (result) {
            $rootScope.currentQuestion = result;
            vm.question = $rootScope.currentQuestion;
          });

      } else {
        vm.question = $rootScope.currentQuestion;

      }

      OptionService.get({'where': angular.toJson({question_id: questionId})}).$promise
        .then(function (result) {
          vm.options = result;
        });
    };

    vm.vote = function () {
      var nanobar = new Nanobar({
        bg: "#27ae60"
      });
      nanobar.go(30);

      ResultService.save({"question_id": vm.question.objectId, "option_id":  $scope.selectedOptionId}).$promise
        .then(function() {
          nanobar.go(100);
        });

    };

    vm.init();

  }

  angular
    .module('pollApp')
    .controller('OptionController', ['$scope', '$rootScope', '$routeParams', 'QuestionService', 'ResultService', 'OptionService', OptionController]);

})();