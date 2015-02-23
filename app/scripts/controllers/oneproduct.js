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
    $scope.init=function(){
      $scope.id=$routeParams.Id;
      $scope.getData($scope.id);
    };
    $scope.getData=function(id){
      //getting data
      $http.get('/products/requests/product?id='+id+'').success(function(data){
        $scope.data=data.data;
        if(!data.data){
          location.href='/#main';
        }
        //getting navigation
        $http.post("/category/requests/" + data.data.list_type + "/" + data.data.list_id, {"action": "getShortNavigation"}).success(function (data) {
          $scope.navigation = data;
          if(data.length==0){
            location.href="/"
          }
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
