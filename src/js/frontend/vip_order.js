login_check();
get_order_info();
function get_order_info(){
    $.ajax({
        method:'POST',
        url:'./API/get_order_info.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            $.each(response ,function(index,row){
                $('#order_info').append(`
                <tr>
                    <td><a href="vip_order_detail.html?${row.ORDER_ID}">${row.ORDER_ID}<br>訂單明細</a></td>
                    <td>${row.ORDER_TIME}</td>
                    <td>${row.ORDER_MODE}</td>
                    <td>${row.TOTAL_PRICE}</td>
                </tr>
                `)
            })

            
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
        }
    })
}