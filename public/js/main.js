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
function ProductsCtrl($scope, $http){
    $scope.title="gfTest";
    $scope.data = null;
    $scope.init = function(list_type, list_id){
        $scope.list_type=list_type;
        $scope.list_id=list_id;
        $http.post("/category/"+$scope.list_type+"/"+$scope.list_id).success(function(data){
            $scope.data=data;
        })
    }


}