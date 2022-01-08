
response = "";
function login_check(){
    $.ajax({
        method:'POST',
        url:'./API/login_check.php',
        data:{
        },
        dataType:'json',
        success:function(res){
            if(res == ''){
                // alert(res);
                window.location.href = './login.html';
            }else{
                response = res;
                console.log(response);
            }
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
        }
    })
}
function change_member_icon(){
    $.ajax({
        method:'POST',
        url:'./API/get_member_info.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            if(response == ''){
            }else{
                // console.log($('#member_icon')[0]);
                $('#member_icon')[0].src = response[0]['MEMBER_PICTURE'];
                // console.log(response);
            }
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}
// console.log("ttttttt");
function member_or_login(){
    $.ajax({
        method:'POST',
        url:'./API/login_check.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            if(response == ''){
                
                window.location.href ='./login.html';
            }else{
                window.location.href = `./vip.html?ID_${response}`;
            }
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}
