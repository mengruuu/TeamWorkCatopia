login_check();
get_member_info(0);
function get_member_info(check){
    $.ajax({
        method:'POST',
        url:'./API/get_member_info.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            $('.name')[0].append(response[0]['MEMBER_MAIL']);
            // console.log($('#member_name')[0].val());
            $('#member_name').val(response[0]['MEMBER_NAME']);
            $('#member_phone').val(response[0]['MEMBER_PHONE']);
            $('#member_address').val(response[0]['MEMBER_ADDRESS']);
            // $('#member_name')[0].placeholder = response[0]['MEMBER_NAME'];
            // $('#member_phone')[0].placeholder = response[0]['MEMBER_PHONE'];
            // $('#member_address')[0].placeholder = response[0]['MEMBER_ADDRESS'];
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}
function check_old_password(){
    $.ajax({
        method:'POST',
        url:'./API/get_member_info.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            let old_password = $('#old_pwd').val();
            // console.log(old_password);
            // console.log(response[0]['MEMBER_PASSWORD']);
            if(old_password == response[0]['MEMBER_PASSWORD']){
                change_info();
                return;
            }else{
                alert('舊密碼輸入錯誤');
            }
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}

function change_info(){
    if(!check_new_password()){
        alert('新密碼語重新輸入密碼不一致');
    }else{
        if(check_personal_info()){
            $.ajax({
                method:'POST',
                url:'./API/change_member_info.php',
                data:{
                    new_password:$('#new_pwd').val(),
                    new_name: $('#member_name').val(),
                    new_phone:$('#member_phone').val(),
                    new_address: $('#member_address').val()
                },
                dataType:'json',
                success:function(response){
                    alert('修改成功');
                    window.location.href = './login.html';
                },o,
                error: function(exception) {
                 alert("發生錯誤: " + exception.status); 
             }
            })
        }
    }
    
}

function check_new_password(){
    $new_pwd = $('#new_pwd').val();
    $new_pwd_again = $('#new_pwd_again').val();
    // console.log($new_pwd);
    // console.log($new_pwd_again);
    if($new_pwd === $new_pwd_again){
        return true;
    }
    return false;
}

function check_personal_info(){
    $member_name = $('#member_name').val();
    $member_phone =$('#member_phone').val();
    $member_address =$('#member_address').val();
    if($member_name ==''){
        alert('請輸入姓名');
        return false;
    }else if($member_phone ==''){
        alert('請輸入電話');
        return false;
    }else if($member_address ==''){
        alert('請輸入地址');
        return false;
    }else{
        return true;
    }
}