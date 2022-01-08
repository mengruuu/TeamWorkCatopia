login_check();
get_order_detail();
function get_order_detail(){
    $.ajax({
        method:'POST',
        url:'./API/get_order_detail.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            $('#title_name').html("訂單編號:" + response[0]['ORDER_ID'] + "<span></span>");
            
        
        
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
        }
    })
}