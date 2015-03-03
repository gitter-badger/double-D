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
      $('title').html('Категории товаров |DIKEA');
      $http.post('/products/requests/getProductsList').success(function (data) {
        $scope.data = data;
        $scope.storage.set('products_categories',$scope.data);
        //$scope.products = data;
      });
      $scope.storage = new LocalStorage();
      $scope.storage.getNumbers();
      $scope.products=$scope.storage.getCategories();
    };
    $scope.makeRequest();
  });
