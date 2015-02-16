/**
 * Created by mohsom on 16.02.2015.
 */
angular.module('dikeaApp')
  .controller('ProductsOnCtg', function ($scope,$http) {
    $scope.init = function (type, id) {
      $scope.list_type = type;
      $scope.list_id = id;
      $scope.getProducts();
      $scope.getNavigation();

    }
    $scope.getProducts = function () {
      $http.post("/category/requests/" + $scope.list_type + "/" + $scope.list_id, {"action": "getProducts"}).success(function (data) {
        $scope.prd = data;
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
    $scope.init();
  });
