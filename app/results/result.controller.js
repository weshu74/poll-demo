'use strict';

(function() {

     function ResultController($scope, $rootScope, $routeParams, QuestionService, ResultService) {
       var vm = this;

       $scope.ctx = $('canvas')[0].getContext("2d");
       $scope.chartData = [];
       $scope.chartOptions = {
         responsive: true,
         showTooltips: false,
         animationSteps: 45
       };

       function createChart(votes) {
         var colors = [];
         var total = 0;

         if ($scope.chartData.length !== votes.length) {
           colors = color.randomColors(votes.length);
           $scope.chartData = $.extend(true, votes, colors);

         }

         total = votes.reduce(function(previousValue, currentValue) {
           return previousValue + currentValue.value;
         }, total);

         if (total > 0) {
           $scope.chart = new Chart($scope.ctx).Doughnut($scope.chartData, $scope.chartOptions);

         }
       };

       function updateChart(votes) {
         $scope.chartData = $.extend(true, $scope.chartData, votes);

         if ($scope.chart != null) {
           for(var i = 0; i < votes.length; i++) {
             $scope.chart.segments[i].value = votes[i].value;
           }

           $scope.chart.update();
         }
       };

       vm.init  = function() {
         var questionId = $routeParams.questionId;

         if ($rootScope.currentQuestion) {
           vm.question = $rootScope.currentQuestion;

         } else {
           QuestionService.get({'where': angular.toJson({objectId: questionId})}).$promise
             .then(function (result) {
                $rootScope.currentQuestion = result;
                vm.question = $rootScope.currentQuestion;
            });

         }

         ResultService.getPoll(questionId).then(function (votes) {
           createChart(votes);
         });
       };

       vm.refresh = function() {
         ResultService.getPoll(vm.question.objectId).then(function (votes) {
           updateChart(votes);
         });
       };

       vm.init();

     };

 angular
   .module('pollApp')
   .controller('ResultController', ['$scope', '$rootScope', '$routeParams', 'QuestionService', 'ResultService', ResultController]);

 })();
