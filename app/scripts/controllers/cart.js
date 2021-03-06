'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')//Ctrl for shopping cart. View: 'cart.html'
  .controller('CartCtrl', function ($scope,$http) {
    $scope.storage = new LocalStorage();
    $scope.data = $scope.storage.get('shopping_cart');
    $('title').html('Корзина |DIKEA');
    $scope.img = function (img) {
      return img.replace('_S3', '_S2');
    };
    $scope.remove = function (item) {
      var index = $scope.data.indexOf(item);
      $scope.data.splice(index, 1);
      $scope.storage.set('shopping_cart', $scope.data);
      $scope.storage.getNumbers();
      $scope.checkData();
    };
    $scope.removeAll = function () {
      $scope.data = [];
      $scope.storage.set('shopping_cart', $scope.data);
      $scope.storage.getNumbers();
      $scope.checkData();
    };
    $scope.numChange = function (item) {
      if (item.number) {
        $scope.storage.set('shopping_cart', $scope.data);
        $scope.storage.getNumbers();
      }
    };
    $scope.showImg = function (item) {
      $('#big_img').attr('src', item.img.replace('_S3', '_S4'));
      $('#myModal.modal-title').html(item.title);
      $('#myModal').modal('show');
    };
    $scope.price = function () {
      var price = 0;
      angular.forEach($scope.data, function (value) {
        price += value.number * value.item.price;
      });
      if(!price) {
        $('.btn-order').attr('disabled', '');
      }
      else{
        $('.btn-order').removeAttr('disabled');
      }
      return price;
    };

    $scope.checkData = function () {
      if (($scope.data) && ($scope.data.length)) {
        $('.btn-order').prop('disabled', false);
      } else {
        $('.btn-order').prop('disabled', true);
      }
    };

    $scope.selfInfo = function () {
      $('#selfInfo').modal('show');
    };
    $scope.submit = function () {
      $scope.setUser();
    };
    $scope.setUser = function () {
      $http.post('/store/do/setCart', $scope.user).success(function (data) {
        if (data.error) {
        } else {
          //$scope.user=data; // todo: remove it in future.
          localStorage.setItem('self_info', angular.toJson($scope.user));
          $('#selfInfo').modal('hide');
          $scope.checkData();
          $scope.sendCartData(data);
        }

      });
    };
    $scope.sendCartData = function (id) {
      console.log($scope.data);
      $http.post('/store/do/setCartList', {
        cartId: id,
        user: $scope.user,
        data: $scope.data
      }).success(function (data) {
        angular.forEach(data, function () {
          $scope.removeAll();
        });
      });
    };

    $(function () {
      $scope.checkData();
      if (localStorage.getItem('self_info')) {
        $scope.user = angular.fromJson(localStorage.getItem('self_info'));
      }
    });
  });
