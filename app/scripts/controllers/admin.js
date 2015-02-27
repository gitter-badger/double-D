'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')
  .controller('AdminCtrl', function ($scope) {
         $scope.user={};
         $scope.submit=function(){
           alert('User name: '+$scope.user.userName);
         };
         $scope.errorSubmit=function(){
           alert("Error!");
         }
  });
