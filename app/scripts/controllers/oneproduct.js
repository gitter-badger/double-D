'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:OneproductCtrl
 * @description
 * # OneproductCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')
  .controller('OneproductCtrl', function ($scope,$http) {
    $scope.number = 1;
    $scope.added = '';
    $scope.storage = new LocalStorage();
    $scope.init = function (data) {
      $scope.data = data;
      $scope.getNavigation();
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
    $scope.getNavigation = function () {
      $http.post('/category/requests/' + $scope.data.list_type + '/' + $scope.data.list_id, {'action': 'getShortNavigation'}).success(function (data) {
        $scope.navigation = data;
        if(data.length===0){
          location.href='/';
        }
      });
    };
  });
