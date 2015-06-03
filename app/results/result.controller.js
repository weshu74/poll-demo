'use strict';

(function() {

     function ResultController($scope, $rootScope, $routeParams, QuestionService, StreamingResultService) {
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
           $scope.$digest();
         }
       };

       function updateChart(votes) {
         $scope.chartData = $.extend(true, $scope.chartData, votes);

         if ($scope.chart != null) {
           for(var i = 0; i < votes.length; i++) {
             $scope.chart.segments[i].value = votes[i].value;
           }

           $scope.chart.update();
           $scope.$digest();
         }
       };

       vm.init  = function() {
         var questionId = $routeParams.questionId;

         if (!$rootScope.currentQuestion) {
           QuestionService.get({'where': angular.toJson({objectId: questionId})}).$promise.then(function (result) {
             $rootScope.currentQuestion = result;
             vm.question = $rootScope.currentQuestion;
           });

         } else {
           vm.question = $rootScope.currentQuestion;

         }

         var streamdataPromise = StreamingResultService.getPoll(questionId, createChart, updateChart);
         streamdataPromise.then(function(streamdata) {
           vm.streamdata = streamdata;
           streamdata.open();
         });
       };

       $scope.$on("$destroy", function() {
         // close the stream when we leave the page
         if (vm.streamdata) {
           vm.streamdata.close();

         }
       });

       vm.init();

     };

 angular
   .module('pollApp')
   .controller('ResultController', ['$scope', '$rootScope', '$routeParams', 'QuestionService', 'StreamingResultService', ResultController]);

 })();