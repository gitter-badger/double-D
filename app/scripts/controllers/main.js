'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.storage = new LocalStorage();
    $scope.storage.getNumbers();
  });
