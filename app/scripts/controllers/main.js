'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')//App Ctrl. View: 'main.html'
  .controller('MainCtrl', function ($scope, $http) {
    $('title').html('Главная |DIKEA');
    $scope.storage = new LocalStorage();
    $scope.storage.getNumbers();
    $scope.init = function () {
      $scope.list_type = 'living_room';
      $scope.list_id = 16239;
      $scope.getProducts();
      $scope.list_type = 'workspaces';
      $scope.list_id = 20649;
      $scope.getProducts_skidki();
    };
    $scope.getProducts = function () {
      $http.post('/category/requests/' + $scope.list_type + '/' + $scope.list_id, {'action': 'getProducts'}).success(function (data) {
        $scope.prd = data;
        $scope.prd = $scope.prd.slice(0, 3);
      });
    };
    $scope.getProducts_skidki = function () {
      $http.post('/category/requests/' + $scope.list_type + '/' + $scope.list_id, {'action': 'getProducts'}).success(function (data) {
        $scope.skidki_prd = data;
        $scope.slidli_prd = $scope.skidki_prd.slice(0, 3);
      });
    };
    $scope.buy = function (item) {
      $scope.storage.addToCart(item, 1);
      item.added = true;
    };
    $scope.added = function (item) {
      if (item.added) {
        $('#' + item.id + '-prd').attr('disabled', '');
        $('#' + item.id + '-prd').html('Куплено!');
        return 'добавлено в корзину';
      } else {
        $('#' + item.id + '-prd').removeAttr('disabled');
        $('#' + item.id + '').html('');
        return '';
      }
    };
    $scope.init();
  });
