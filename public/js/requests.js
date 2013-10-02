$(document).ready(function(){
    $.update = new UpdateData();
})

function UpdateData(){
    var th = this;
    this.p_html= null;
    this.list_btn=$("#products_list"); // buttons for updating products list
    this.p_btn = $("#products");  // button for updating products page by page
    this.p_progress = $("#p_progress");  // progress bar for updating products page by page.
    this.products = [];

    this.updateList= function(){
        th.list_btn.button("loading");
        $.ajax({
            method:"post",
            url:"/products/requests/getProductsPage"
        }).done(function(obj){
                th.p_html = $(obj).find(".productCategoryContainer");
                th.parseProductsList();
            })
    }
    this.parseProductsList = function(){
        th.p_data=[];
        th.p_html.each(function(){
            var obj = [];
            var header = $(this).find(".header").html().trim();
            $(this).find(".textContainer a").each(function(){
                var href = this.href.split("/");
                var list_obj = {};
                list_obj.value=$(this).html().trim();
                list_obj.type=href[8];
                list_obj.id= href[9];
                list_obj.header= header;
                list_obj.active=true;

                th.p_data.push(list_obj);
            })
        })
        th.saveProductsList();
    }
    this.saveProductsList = function(){
        $.ajax({
            method:"post",
            url:"/products/requests/saveProductsList",
            data:{
                data:th.p_data
            }
        }).done(function(obj){
               console.log(obj);
                th.list_btn.button("reset");
                $("#list_done").addClass('label-default');
            });
    }
    this.getProductsList= function(){       //handler of #products button
        th.p_btn.button("loading");
        $("#p_done").addClass("label-default");
        $("#p_done").html("getting products list");
        $.ajax({
            method:"post",
            url:"/products/requests/getProductsList"
        }).done(function(data){
                th.p_data= JSON.parse(data);
                th.getPageByPage();
            })
    }
    this.getPageByPage = function(){      //method for getting all products page by page
        var data_arr = [];
        for(var key in th.p_data){
            for(var j =0; j<th.p_data[key].length; j++){
                data_arr.push(th.p_data[key][j]);
            }
        }
        th.p_data = data_arr;
        th.products = [];
        $("#p_done").html("started getting pages");
        th.getPage(0);      //default should be 0
    }
    this.getPage= function(page){
        $.ajax({
            method:"post",
            url:"/products/requests/getPage",
            data:{
                id:th.p_data[page].id,
                type:th.p_data[page].type
            }
        }).done(function(obj){
                obj = JSON.parse(obj);
                obj.page_pl= $(obj.page_pl).find("#productLists .threeColumn.product");
                obj.page_ru= $(obj.page_ru).find("#productLists");
                th.products.push(obj);
                page++;
                var progress = 100*page/th.p_data.length;
                th.p_progress.css("width",progress+"%");
                $("#p_done").html("step 1/2: getting pages("+page+"/"+th.p_data.length+")");
                if(page<th.p_data.length
                    && page<5           //remove this line when finished
                    ){
                    setTimeout(function(){
                        th.getPage(page);
                    },1000)
                }else{
                    th.p_btn.button("reset");
                    th.p_progress.css("width","100%");
                    $("#p_done").html("Done!");
                    th.parsePages();
                }
            })
    }
    this.parsePages= function(){
        var data = [];
        $("#p_done").html("parsing pages");
        $(this.products).each(function(){
            var data_obj =[];
            var page_ru = this.page_ru;
            var list_id = this.id;
            var list_type = this.type;
            $(this.page_pl).each(function(){
                var obj = {}
                obj.href = "http://www.ikea.com"+$(this).find(".image a").attr("href");
                obj.id = obj.href.split("/")[7];
                obj.img = "http://www.ikea.com"+$(this).find(".image a img").attr("src");
                obj.title = $(this).find(".productDetails .productTitle").html().trim();
                obj.desp = $(this).find(".productDetails .productDesp").html().trim();
                obj.list_id = list_id;
                obj.list_type = list_type;
//                obj.price_type = $(this).find(".productDetails .price #comparizonContainer span").html().trim();
                $(this).find(".price.regularPrice div").remove();
                obj.price = $(this).find(".productDetails .price.regularPrice").html().trim().replace(/&nbsp;/g,"").replace(/PLN/g,"").replace(/,/g, ".");
                obj.price = $.isNumeric(obj.price)?obj.price:0;         // check if number;
                obj.more_info = $(this).find(".moreInfo span:not(:empty)").html().trim();
                var ru_item = page_ru.find(".image a[href='"+($(this).find(".image a").attr("href").replace("pl/pl", "ru/ru"))+"']").closest(".threeColumn.product");
                if(ru_item.length>0){
                    obj.title =ru_item.find(".productDetails .productTitle").html().trim()
                    obj.desp = ru_item.find(".productDetails .productDesp").html().trim();
                    obj.more_info = ru_item.find(".moreInfo span:not(:empty)").html().trim();
                }
                data_obj.push(obj)
            })
            data.push(data_obj);
        })
         th.products=data;
        th.saveProducts(0)
    }
    this.saveProducts = function(item){
        console.log(th.products[item]);
        if(th.products[item].length==0){
            th.saveProducts(++item);
        }
        $.ajax({
            method:"post",
            url:"/products/requests/saveProducts",
            data:{
                data:th.products[item]
            }
        }).done(function(obj){
                console.log(obj);
                item++;
                $("#p_done").html("step 2/2: saving pages of products("+item+"/"+th.products.length+")");
                var progress = 100*item/th.p_data.length;
                th.p_progress.css("width",progress+"%");
                if(item<th.products.length){
                    th.saveProducts(item);
                }else{
                    th.p_progress.css("width","100%");
                    $("#p_done").html("Done!");
                }
            });
    }

    this.init= function(){
        th.list_btn.click(th.updateList);
        th.p_btn.click(th.getProductsList)
    }
    this.init();
}