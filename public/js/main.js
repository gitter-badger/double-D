function ProductsListCtrl($scope, $http) {
    $scope.storage = new LocalStorage();
    $http.post('/products/requests/getProductsList').success(function (data) {
        $scope.products = data;
    });
}
function ProductsCtrl($scope, $http, $location) {
    $scope.isCollapsed = true;
    $scope.title = "gfTest";
    $scope.data = null;
    $scope.storage = new LocalStorage();

    $scope.init = function (type, id, path) {
        $scope.list_type = type;
        $scope.list_id = id;
        if(path){
            $location.path(""+path);
        }
        if($location.path()!=""){
            $scope.list_id = parseInt($location.path().replace(/\//g, ""));
        }
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
function ProductCtrl($scope) {
    $scope.number = 1;
    $scope.added = "";
    $scope.storage = new LocalStorage();
    $scope.init = function (data) {
        $scope.data = data;
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