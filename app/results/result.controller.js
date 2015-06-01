'use strict';

(function() {

     function ResultController($scope, $rootScope, $routeParams, QuestionService, ResultService) {
       var vm = this;

       $scope.ctx = $('canvas')[0].getContext("2d");
       var context = $scope.ctx;
       $scope.chartData = [];
       $scope.chartOptions = {
         responsive: true,
         showTooltips: false,
         animationSteps: 45
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

         ResultService.getPoll(questionId).then(function (data) {
           vm.results = data;

           var colors = [];
           var total = 0;

           if ($scope.chartData.length !== data.length) {
             colors = color.randomColors(data.length);
             $scope.chartData = $.extend(true, data, colors);

           } else {
             $scope.chartData = $.extend(true, $scope.chartData, data);

           }

           total = data.reduce(function(previousValue, currentValue) {
             return previousValue + currentValue.value;
           }, total);

           if ($scope.chart != null) {
             // TODO update the chart
             for(var i = 0; i < data.length; i++) {
               $scope.chart.segments[i].value = data[i].value;
             }

             $scope.chart.update();
           } else if (total > 0) {
            $scope.chart = new Chart($scope.ctx).Doughnut($scope.chartData, $scope.chartOptions);

           }
         });
       };

       vm.init();

     };

 angular
   .module('pollApp')
   .controller('ResultController', ['$scope', '$rootScope', '$routeParams', 'QuestionService', 'ResultService', ResultController]);

 })();
