'use strict';

/**
 * @ngdoc overview
 * @name dikeaApp
 * @description
 * # dikeaApp
 *
 * Main module of the application.
 */
angular.module('dikeaApp', [  //Route config
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/products', {
        templateUrl: 'views/products.html',
        controller: 'ProductsCtrl'
      })
      .when('/products/:Type/:Id', {
        templateUrl: 'views/productslist.html',
        controller: 'ProductslistCtrl'
      })
      .when('/product/:Id', {
        templateUrl: 'views/oneproduct.html',
        controller: 'OneproductCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .when('/C:/Program Files (x86)/Git/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });
