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
         $scope.localStorage=new LocalStorage();
         $scope.localStorage.getNumbers();
         $('title').html('Admin |DIKEA');
         $scope.submitForm=function(){
           console.log('User name: '+$scope.user.userName+' Password: '+$scope.user.Password);
         };
         $scope.errorSubmit=function(){
          console.log('Fill the all fields!');
         };
  });
