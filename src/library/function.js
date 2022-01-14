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
                // alert('');
                window.location.href = './login.html';
            }else{
                response = res;
                // alert(response);
                console.log(response);
            }
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
        }
    })
}
// console.log(response);
// console.log("test");
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
                // console.log(($('#member_icon')[0].src));
                let pic_name_num = $('#member_icon')[0].src.lastIndexOf('/');
                // console.log(pic_name_num);
                let pic_name = $('#member_icon')[0].src.substring(pic_name_num + 1);
                // console.log(pic_name);
                if(pic_name != 'login_header_icon_member.png'){
                    $('#member_icon').css("transform","scale(1.1)");
                    // $('#member_icon')[0].width(60);
                    // console.log($('#member_icon')[0]);
                }else{
                    console.log("test");
                }
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

function login_check_no_direct(){
    let login;
    fetch('./API/login_check.php').then(res => res.json()).then(res =>{
        if(res == ""){
            console.log('沒登入');
            login = false;
        }else{
            console.log('登入中');
            login = true;
        }
    }).catch(function(err){
        console.log('no data found');
    })
    console.log(login);
}