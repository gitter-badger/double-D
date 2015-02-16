'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')
  .controller('ProductsCtrl', function ($scope,$http) {
    $scope.storage = new LocalStorage();
    $scope.makeRequest = function () {
      $http.post('/products/requests/getProductsList').success(function (data) {
        $scope.products = data;
        $("body").animate({"scrollTop": 0}, 0);
      });
    }
    $scope.init = function (type, id) {
      $scope.list_type = type;
      $scope.list_id = id;
      $(".thumbnails").animate({opacity: 0}, 50);
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
      $("#" + item.id + "").animate({opacity: "1"}, 500);
      $("#" + item.id + "").animate({opacity: "0"}, 1000);
    }
    $scope.added = function (item) {
      if (item.added) {
        return "добавлено в корзину"
      } else {
        return "";
      }
    }
  });
