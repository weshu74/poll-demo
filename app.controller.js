'use strict';

(function() {

     function PollAppController($scope, $log, $timeout) {
       var vm = this;

       vm.init  = function() {

       };

       vm.init();

     };

 angular
   .module('pollApp')
   .controller('PollAppController', ['$scope', '$log', '$timeout', PollAppController]);

 })();