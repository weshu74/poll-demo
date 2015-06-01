'use strict';

(function() {

     function ResultController($scope, $rootScope, $routeParams, QuestionService, OptionService, StreamingResultService) {
       var vm = this;

       $scope.ctx = $('canvas')[0].getContext("2d");
       var context = $scope.ctx;
       $scope.chartData = [];
       $scope.chartOptions = {
         responsive: true,
         showTooltips: false,
         animationSteps: 45
       };

       vm.updateChartData = function(data, options) {
         var optionsMap = {};
         options.forEach(function (option) {
           optionsMap[option.objectId] = {label: option.Title, value: 0};
         });

         data.results.forEach(function (vote) {
           optionsMap[vote.option_id].value++;
         });

         var results = [];
         for (var option in optionsMap) {
           results.push(optionsMap[option]);
         }

         return results;
       }

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


         OptionService.get({'where': angular.toJson({question_id: questionId})}).$promise.then(function(options) {
           vm.options = options;

           var url = 'https://api.parse.com/1/classes/Vote?where=' + encodeURIComponent('{\"question_id\": \"' + questionId + '\"}');
           var streamdata = StreamingResultService.init(url);

           streamdata.onData(function(data) {
             var results = vm.updateChartData(data, options);
             vm.results = data;
             var colors = [];
             var total = 0;

             if ($scope.chartData.length !== results.length) {
               colors = color.randomColors(results.length);
               $scope.chartData = $.extend(true, results, colors);

             } else {
               $scope.chartData = $.extend(true, $scope.chartData, results);

             }

             //total = data.reduce(function(previousValue, currentValue) {
             //  return previousValue + currentValue.value;
             //}, total);
             console.log('****-------**' + JSON.stringify(results));
             console.log('**----------**' + JSON.stringify($scope.chartData));
             $scope.chart = new Chart($scope.ctx).Doughnut($scope.chartData, $scope.chartOptions);
             $scope.$digest();

           })
             .onPatch(function(patch) {
               jsonpatch.apply(vm.results, patch);
               var results = vm.updateChartData(vm.results, vm.options);

               for(var i = 0; i < results.length; i++) {
                 $scope.chart.segments[i].value = results[i].value;
               }
               $scope.chartData = $.extend(true, $scope.chartData, results);
               $scope.chart.update();
               $scope.$digest();

             })
             .onError(function(error) {
               console.error('--------' + error);
             });


           ;
           streamdata.open();
         });
       //  ResultService.getPoll(questionId).then(function (data) {
       //    vm.results = data;
       //
       //    var colors = [];
       //    var total = 0;
       //
       //    if ($scope.chartData.length !== data.length) {
       //      colors = color.randomColors(data.length);
       //      $scope.chartData = $.extend(true, data, colors);
       //
       //    } else {
       //      $scope.chartData = $.extend(true, $scope.chartData, data);
       //
       //    }
       //
       //    total = data.reduce(function(previousValue, currentValue) {
       //      return previousValue + currentValue.value;
       //    }, total);
       //
       //    if ($scope.chart != null) {
       //      // TODO update the chart
       //      for(var i = 0; i < data.length; i++) {
       //        $scope.chart.segments[i].value = data[i].value;
       //      }
       //
       //      $scope.chart.update();
       //    } else if (total > 0) {
       //     $scope.chart = new Chart($scope.ctx).Doughnut($scope.chartData, $scope.chartOptions);
       //
       //    }
       //  });
       };

       vm.init();

     };

 angular
   .module('pollApp')
   .controller('ResultController', ['$scope', '$rootScope', '$routeParams', 'QuestionService', 'OptionService', 'StreamingResultService', ResultController]);

 })();