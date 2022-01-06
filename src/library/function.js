function login_check(){
    $.ajax({
        method:'POST',
        url:'./API/login_check.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            if(response == ''){
                alert('請先登入');
                window.location.href = './login.html';
            }
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}
