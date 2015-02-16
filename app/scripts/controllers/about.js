'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dikeaApp
 */
angular.module('dikea')
  .controller('AboutCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.makeRequest = function () {
      $http.post('/products/requests/getProductsList').success(function (data) {
        console.log('data is:', data);
      });
    };

    $scope.makeRequest();
  });
