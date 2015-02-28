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
         $scope.submitForm=function(){
           //alert('User name: '+$scope.user.userName+' Password: '+$scope.user.Password);
         };
         $scope.errorSubmit=function(){
          // alert('Fill the all fields!');
         };
  });
