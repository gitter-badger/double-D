$(document).ready(function(){
    $.update = new UpdateData();
})

function UpdateData(){
    var th = this;

    this.updateList= function(){
        $("#products_list").button("loading");
    }

    this.init= function(){
        $("#products_list").click(th.updateList);
        $.ajax({
            method:"post",
            url:"/products/requests",
            data:{
                'action':"getProductsPage"
            }
        }).done(function(obj){
                $.html = $(obj);
            })
    }
    this.init();
}