'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')
  .controller('ProductsCtrl', function ($scope,$http) {
    $scope.makeRequest = function () {
      $http.post('/products/requests/getProductsList').success(function (data) {
        $scope.products = data;
        $("body").animate({"scrollTop": 0}, 0);
      });
    }
    $scope.makeRequest();
  });
