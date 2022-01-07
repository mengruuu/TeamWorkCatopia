login_check();
function go_to_vip_personal(){
    $.ajax({
        method:'POST',
        url:'./API/login_check.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            window.location.href = `./vip_personal.html?${response}`;
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}
function go_to_vip_order(){
    $.ajax({
        method:'POST',
        url:'./API/login_check.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            window.location.href = `./vip_order.html?${response}`;
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}