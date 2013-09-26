/**
 * Created with JetBrains PhpStorm.
 * User: gfspock
 * Date: 23.09.13
 * Time: 15:18
 * To change this template use File | Settings | File Templates.
 */
function ProductsListCtrl($scope, $http){
    $http.post('/products/requests/getProductsList').success(function(data) {
        $scope.products = data;
    });
}