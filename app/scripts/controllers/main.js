'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')//App Ctrl. View: 'main.html'
  .controller('MainCtrl', function ($scope,$http) {
    $('title').html('Главная |DIKEA');
    $scope.storage = new LocalStorage();
    $scope.storage.getNumbers();
    $scope.list_type='living_room';
    $scope.list_id=16239;
    $scope.init=function(){
         $scope.getProducts();
    };
    $scope.getProducts = function () {
      $http.post('/category/requests/' + $scope.list_type + '/' + $scope.list_id, {'action': 'getProducts'}).success(function (data) {
        $scope.prd = data;
        $scope.prd=$scope.prd.slice(0,3);
      });
    };
    $scope.buy = function (item) {
      $scope.storage.addToCart(item, 1);
      item.added = true;
    };
    $scope.added = function (item) {
      if (item.added) {
        $('#'+item.id+'').html('добавлено в корзину');
        $('#'+item.id+'-prd').attr('disabled','');
        return 'добавлено в корзину';
      } else {
        $('#'+item.id+'-prd').removeAttr('disabled');
        $('#'+item.id+'').html('');
        return '';
      }
    };
    $scope.init();
  });
