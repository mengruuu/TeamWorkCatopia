login_check();
get_member_info();
function get_member_info(){
    $.ajax({
        method:'POST',
        url:'./API/get_member_info.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            console.log(response);
            $('#member_mail').html(response[0]['MEMBER_MAIL']);
            $('#member_name').html(response[0]['MEMBER_NAME']);
            $('#input_order_name').val(response[0]['MEMBER_NAME']);

            $('#member_phone').html(response[0]['MEMBER_PHONE']);
            $('#member_address').html(response[0]['MEMBER_ADDRESS']);

        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
        }
    })
}


function submit_order_data(){

    if( $("input[name='receiver']:checked").val() == '不同訂購人' ){
        let new_order_name= $('#order_name').val();
        $("input[name='receiver']:checked").val(new_order_name);
    }

    $.ajax({
        method:'POST',
        url:'./API/cart_step2.php',
        data:{
            Payment_method:$("input[name='pay']:checked").val(),
            Order_name:$("input[name='receiver']:checked").val(),
            Order_phone:$("#order_phone").val(),
            deliver:$("input[name='deliver']:checked").val(),
            Address:$("#receiver_address").val(),
        },
        dataType:'json',
        success:function(response){
            console.log('傳送成功');
            console.log(response);
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
        }
    })

    window.location.href = "./gacha_cart_step3.html"
}

function check_info(){
    if($("input[name='receiver']:checked").val() == '不同訂購人' &&  $('#order_name').val() == ''){
        alert('請填入收件人');
        return false;
    }
    if($("#order_phone").val() == ""){
        alert('請填入連絡電話');
        return false;
    }
    if($("#receiver_address").val() == ""){
        alert('請填入收件地址');
        return false;
    }

    submit_order_data();

}

// 如果 不同訂購人
// 不同訂購人 不能等於空值




// function click_go(){


//     // console.log($("input[name='receiver']:checked").val());
//     if( $("input[name='receiver']:checked").val() == '不同訂購人' ){
//         let new_order_name= $('#order_name').val();
//         $("input[name='receiver']:checked").val(new_order_name);
//     }
//     // console.log($("input[name='receiver']:checked").val());
    
// }
