'use strict';

describe('Controller: OneproductCtrl', function () {

  // load the controller's module
  beforeEach(module('dikeaApp'));

  var OneproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OneproductCtrl = $controller('OneproductCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
