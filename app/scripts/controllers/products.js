'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')//category Ctrl. View: 'products.html'
  .controller('ProductsCtrl', function ($scope,$http) {
    $scope.makeRequest = function () {
      $http.post('/products/requests/getProductsList').success(function (data) {
        $scope.products = data;
        $('title').html('Категории товаров |DIKEA');
      });
      $scope.storage = new LocalStorage();
      $scope.storage.getNumbers();
    };
    $scope.makeRequest();
  });
