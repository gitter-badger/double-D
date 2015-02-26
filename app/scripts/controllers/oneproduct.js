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
    $scope.prd1=[];

    $scope.init = function () {
      $scope.id = $routeParams.Id;
      $scope.getData($scope.id);
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
        //todo:fix the bug
        $http.post('/category/requests/' + data.data.list_type + '/' + data.data.list_id, {'action': 'getProducts'}).success(function (data) {
          $scope.prd = data;
          $scope.prd= $scope.shuffleArray($scope.prd);
          $scope.prd1=$scope.prd;
        });
      });
    };
    $scope.shuffleArray=function(array){
      var counter=array.length;
      var temp,index;
      while(counter>0){
        index=Math.floor(Math.random()*counter);
        counter--;
        temp=array[counter];
        array[counter]=array[index];
        array[index]=temp;
      }
      var shuffledArr=array;
      return shuffledArr;
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
