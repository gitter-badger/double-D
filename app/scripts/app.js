'use strict';

/**
 * @ngdoc overview
 * @name dikeaApp
 * @description
 * # dikeaApp
 *
 * Main module of the application.
 */
angular.module('dikeaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider.
      when('/', {
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
      .when('/products/:list_type/:list_id/product/:Id', {
        templateUrl: 'views/oneproduct.html',
        controller: 'OneproductCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
