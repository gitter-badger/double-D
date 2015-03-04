'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:ProductslistCtrl
 * @description
 * # ProductslistCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')//Products in Category Ctrl. View: 'productslist.html'
  .controller('ProductslistCtrl', function ($scope, $routeParams,$http,$filter) {
    $scope.storage = new LocalStorage();
    $scope.storage.getNumbers();
    $scope.predicate = '';
    var orderBy = $filter('orderBy');
    $scope.order = function(predicate) {
      $scope.prd = orderBy($scope.prd, predicate);
    };
    $scope.order('',false);
    $scope.init = function () {
      $scope.list_type = $routeParams.Type;
      $scope.list_id = $routeParams.Id;
      $scope.navigation_data=window.navigation_data;
      $scope.header=window.header;
      $scope.getProducts();
      if((!window.navigation_data)&&(window.list_type!==$scope.list_type)) {
        $scope.getNavigation();
      }
      window.navigation_data=null;
      window.header=null;
    };
    $scope.initFromNavigation = function (type,id) {
      window.navigation_data=$scope.navigation_data;
      window.list_type=type;
      window.header=$scope.header;
      $scope.prd=[];
      $scope.list_type = type;
      $scope.list_id = id;
      $scope.getProducts();
    };
    $scope.getProducts = function () {
      $http.post('/category/requests/' + $scope.list_type + '/' + $scope.list_id, {'action': 'getProducts'}).success(function (data) {
        $scope.prd = data;
      });
    };

    $scope.getNavigation = function () {
      $http.post('/category/requests/' + $scope.list_type + '/' + $scope.list_id, {'action': 'getNavigation'}).success(function (data) {
        $scope.navigation_data = data;
        if (data.length === 0) {
          location.href = '/';
        }
        $scope.header = data[0].header;
        $('title').html($scope.header+' |DIKEA');
      });
    };
    $scope.isActive = function (id) {
      if (id === $scope.list_id) {
        return 'active';
      }
      return '';
    };

    $scope.buy = function (item) {
      $scope.storage.addToCart(item, 1);
      item.added = true;
    };
    $scope.added = function (item) {
      if (item.added) {
        $('#'+item.id+'').html('добавлено в корзину');
        return 'добавлено в корзину';
      } else {
        $('#'+item.id+'').html('');
        return '';
      }
    };
    $scope.init();
  });
