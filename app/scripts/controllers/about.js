'use strict';

/**
 * @ngdoc function
 * @name dikeaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dikeaApp
 */
angular.module('dikeaApp')//about us page Ctrl. View: 'about.html'
  .controller('AboutCtrl', function ($scope, $http) {
    $('title').html('О нас |DIKEA');
  });
