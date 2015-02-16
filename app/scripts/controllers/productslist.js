'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:ProductslistCtrl
 * @description
 * # ProductslistCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')
  .controller('ProductslistCtrl', function ($scope, $routeParams) {
    $scope.init();
    $scope.init = function () {
      $scope.list_type = $routeParams.Type;
      $scope.list_id = $routeParams.Id;
      $scope.getProducts();
      $scope.getNavigation();
    }
    $scope.getProducts = function () {
      $http.post("/category/requests/" + $scope.list_type + "/" + $scope.list_id, {"action": "getProducts"}).success(function (data) {
        $scope.prd = data;
        $(".thumbnails").animate({opacity: 1}, 200);
      });
    }

    $scope.getNavigation = function () {
      $http.post("/category/requests/" + $scope.list_type + "/" + $scope.list_id, {"action": "getNavigation"}).success(function (data) {
        $scope.navigation_data = data;
        if (data.length == 0) {
          location.href = "/"
        }
        $scope.header = data[0].header;
      });
    }
    $scope.isActive = function (id) {
      if (id == $scope.list_id) {
        return "active";
      }
      return "";
    }

    $scope.buy = function (item) {
      $scope.storage.addToCart(item, 1);
      item.added = true;
    }
    $scope.added = function (item) {
      if (item.added) {
        return "добавлено в корзину"
      } else {
        return "";
      }
    }
  });
