'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:OneproductCtrl
 * @description
 * # OneproductCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')//Product page Ctrl. View: 'oneproduct.html'
  .controller('OneproductCtrl', function ($scope,$http,$routeParams) {
    $scope.number = 1;
    $scope.added = '';
    $scope.storage = new LocalStorage();
    $scope.data={};
    $scope.navigation={};
    $scope.init=function(){
      $scope.id=$routeParams.Id;
      $scope.getData($scope.id);
      $scope.getNavigation();
    };
    $scope.getData=function(id){
      $http.get('/products/requests/product?id='+id+'').success(function(data){
        $scope.data=data.data;
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
    $scope.getNavigation = function () {
      $http.get('/category/requests/' + $scope.data.list_type + '/' + $scope.data.list_id, {'action': 'getShortNavigation'}).success(function (data) {
        $scope.navigation = data;
        if(data.length===0){
          location.href='/';
        }
      });
    };
    $scope.init();
  });
