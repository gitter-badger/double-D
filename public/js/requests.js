$(document).ready(function(){
    $.update = new UpdateData();
})

function UpdateData(){
    var th = this;
    this.p_html= null;
    this.p_btn=$("#products_list"); // buttons for updating products list

    this.updateList= function(){
        th.p_btn.button("loading");
        $.ajax({
            method:"post",
            url:"/products/requests/getProductsPage"
        }).done(function(obj){
                th.p_html = $(obj).find(".productCategoryContainer");
//                th.p_btn.button("reset");
                th.parseProducts();
            })
    }
    this.parseProducts = function(){
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

//            p_data.push(obj);
        })
        th.saveProducts(th.p_data);
    }
    this.saveProducts = function(data){
        console.log(data);
        $.ajax({
            method:"post",
            url:"/products/requests/saveProducts",
            data:{
                data:data
            }
        }).done(function(obj){
               console.log(obj);
                th.p_btn.button("reset");
            });
    }

    this.init= function(){
        th.p_btn.click(th.updateList);

    }
    this.init();
}