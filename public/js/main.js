function ProductsListCtrl($scope, $http) {
    $scope.storage = new LocalStorage();
    $http.post('/products/requests/getProductsList').success(function (data) {
       $scope.products = data;
        console.log("good request! "+$scope.products.length+"");
    });
    $scope.init = function (type, id) {
        $scope.list_type = type;
        $scope.list_id = id;
        $(".thumbnails").animate({opacity:0}, 50);
        $scope.getProducts();
        $scope.getNavigation();

    }
    $scope.getProducts = function () {
        $http.post("/category/requests/" + $scope.list_type + "/" + $scope.list_id, {"action": "getProducts"}).success(function (data) {
            $scope.prd = data;
            $(".thumbnails").animate({opacity:1}, 200);
        });
    }

    $scope.getNavigation = function () {
        $http.post("/category/requests/" + $scope.list_type + "/" + $scope.list_id, {"action": "getNavigation"}).success(function (data) {
            $scope.navigation_data = data;
            if(data.length==0){
                location.href="/"
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
    $scope.tab=1;
    $scope.setTabValue=function(val)
    {
        $scope.tab=val;
    }
    $scope.getTabValue=function(val)
    {
        return $scope.tab;
    }
}
function ProductsCtrl($scope, $http, $location) {
    $scope.isCollapsed = true;
    $scope.title = "gfTest";
    $scope.data = null;
    $scope.storage = new LocalStorage();

    $scope.init = function (type, id, path) {
        $scope.list_type = type;
        $scope.list_id = id;
        //if(path){
        //    $location.path(""+path);
        //}
        //if($location.path()!=""){
        //    $scope.list_id = parseInt($location.path().replace(/\//g, ""));
        //}
        $(".thumbnails").animate({opacity:0}, 50);
        $scope.getProducts();
        $scope.getNavigation();

    }
    $scope.getProducts = function () {
        $http.post("/category/requests/" + $scope.list_type + "/" + $scope.list_id, {"action": "getProducts"}).success(function (data) {
            $scope.data = data;
            $(".thumbnails").animate({opacity:1}, 200);
        });
    }

    $scope.getNavigation = function () {
        $http.post("/category/requests/" + $scope.list_type + "/" + $scope.list_id, {"action": "getNavigation"}).success(function (data) {
            $scope.navigation_data = data;
            if(data.length==0){
                location.href="/"
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
}
function ProductCtrl($scope, $http) {
    $scope.number = 1;
    $scope.added = "";
    $scope.storage = new LocalStorage();
    $scope.init = function (data) {
        $scope.data = data;
        $scope.getNavigation();
    }
    $scope.price = function () {
        return $scope.data.price * $scope.number;
    }
    $scope.buy = function () {
        if ($scope.price()) {
            $scope.storage.addToCart($scope.data, $scope.number);
            $scope.added = "добавлено в корзину";
        }
    }
    $scope.getNavigation = function () {
        $http.post("/category/requests/" + $scope.data.list_type + "/" + $scope.data.list_id, {"action": "getShortNavigation"}).success(function (data) {
            $scope.navigation = data;
            if(data.length==0){
                location.href="/"
            }
            console.log(data);
        });
    }
}

function ShoppingCart($scope, $http){
    $scope.storage = new LocalStorage();
    $scope.data = $scope.storage.get("shopping_cart");

    $scope.img=function(img){
        return img.replace("_S3","_S2");
    }
    $scope.remove = function(item, $event){
        var index = $scope.data.indexOf(item);
        $scope.data.splice(index,1)
        $scope.storage.set("shopping_cart",$scope.data)
        $scope.storage.getNumbers();
        $scope.checkData();
    }
    $scope.removeAll=function(){
        $scope.data=[];
        $scope.storage.set("shopping_cart",$scope.data)
        $scope.storage.getNumbers();
        $scope.checkData();
    }
    $scope.numChange= function(item){
        if(item.number){
            $scope.storage.set("shopping_cart",$scope.data)
            $scope.storage.getNumbers();
        }
    }
    $scope.showImg=function(item){
        $("#big_img").attr("src",item.img.replace("_S3","_S4"));
        $('#myModal .modal-title').html(item.title)
        $('#myModal').modal('show')
    }
    $scope.price = function(){
        var price = 0
        angular.forEach($scope.data, function(value,key){
            price+=value.number*value.item.price;
        });
        return price;
    }

    $scope.checkData= function(){
        if($scope.data.length){
            $('.btn-order').prop('disabled', false);
        }else{
            $('.btn-order').prop('disabled', true);
        }
    }

    $scope.selfInfo=function(){
        $('#selfInfo').modal('show');
    }
    $scope.submit = function(){
        $scope.setUser();
    }
    $scope.setUser = function(){
        $http.post("/store/do/setCart", $scope.user).success(function (data) {
            if(data.error){
            }else{
//                $scope.user=data; // todo: remove it in future.
                localStorage.setItem('self_info', angular.toJson($scope.user));
                $('#selfInfo').modal('hide');
                $scope.sendCartData(data);
            }

        });
    }
    $scope.sendCartData= function(id){
        console.log($scope.data);
        $http.post('/store/do/setCartList', {
            cartId : id,
            user:$scope.user,
            data:$scope.data
        }).success(function(data){
            angular.forEach(data,function(item){

                $scope.removeAll();
            })
        });
    }

    $(function(){
        $scope.checkData();
        if(localStorage.getItem('self_info')){
            $scope.user = angular.fromJson(localStorage.getItem('self_info'));
        }
    });

}

function LocalStorage() {
    var th = this;

    this.init = function () {
        $("#cart_number").html(th.getNumbers());
    }
    this.set = function (name, value) {
        if (!th.check()) {
            return false;
        }
        localStorage.setItem(name, JSON.stringify(value));
        return true;
    }
    this.get = function (name) {
        if (!th.check()) {
            return false;
        }
        var cart = localStorage.getItem(name);
        return JSON.parse(cart);
    }
    this.delete = function (name) {
        if (!th.check()) {
            return false;
        }
        localStorage.removeItem(name);
    }
    this.check = function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }
    this.getNumbers = function () {
        var data = th.get("shopping_cart");
        var number = 0
        $(data).each(function () {
            number += this.number;
        })
        $("#cart_number").html(number);
        return number;
    }
    this.addToCart = function (data, number) {
        var cart = th.get("shopping_cart");
        if (!cart) {
            cart = [];
        }
        var exist = false;
        $(cart).each(function () {
            if (this.item.id == data.id) {
                this.number += number;
                exist = true;
                return;
            }
        })
        if (!exist) {
            cart.push({item: data, number: number});
        }
        th.set("shopping_cart", cart);
        th.getNumbers();
    }
    this.init();
}
function tabCtrl($scope) {
    $scope.tab=1;
    $scope.setTabValue=function(val)
    {
        $scope.tab=val;
    }
    $scope.getTabValue=function()
    {
        return $scope.tab;
    }
}
