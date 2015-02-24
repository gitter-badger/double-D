'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:OneproductCtrl
 * @description
 * # OneproductCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')//Product page Ctrl. View: 'oneproduct.html'
  .controller('OneproductCtrl', function ($scope, $http, $routeParams) {
    $scope.number = 1;
    $scope.added = '';
    $scope.storage = new LocalStorage();
    $scope.data = {};
    $scope.prd1=new Array(5);

    $scope.init = function () {
      $scope.id = $routeParams.Id;
      $scope.getData($scope.id);
      $('.sming').tooltip();
    };
    $scope.getData = function (id) {
      //getting data
      $http.get('/products/requests/product?id=' + id + '').success(function (data) {
        $scope.data = data.data;
        if ((!data.data)||(data.data.id==='')) {
          location.href = '/#main';
        }
        //getting navigation
        $http.post('/category/requests/' + data.data.list_type + '/' + data.data.list_id, {'action': 'getShortNavigation'}).success(function (data) {
          $scope.navigation = data;
          if (data.length === 0) {
            location.href = '/';
          }
        });
        //others products
        $http.post('/category/requests/' + data.data.list_type + '/' + data.data.list_id, {'action': 'getProducts'}).success(function (data) {
          $scope.prd = data;
          $scope.prd= _.shuffle($scope.prd);
          $scope.prd1[0]=$scope.prd[0];
          $scope.prd1[1]=$scope.prd[1];
          $scope.prd1[2]=$scope.prd[2];
          $scope.prd1[3]=$scope.prd[3];
          $scope.prd1[4]=$scope.prd[4];
        });
      });
    };
    $scope.price = function () {
      return $scope.data.price * $scope.number;
    };
    $scope.buy = function () {
      if ($scope.price()) {
        $scope.storage.addToCart($scope.data, $scope.number);
        $scope.added = 'добавлено в корзину';
      }
    };
    $scope.init();
  });
