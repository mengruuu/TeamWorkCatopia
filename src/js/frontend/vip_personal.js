var popupBtn = document.getElementById('background_pop');
var popupClick = document.getElementById('popup_click');
var close = document.getElementById('close_btn');
popupClick.addEventListener('click', function(){
    popupBtn.style.display = "block";
    // console.log('test');
})
close.onclick = function close() {
    popupBtn.style.display = "none";
}
window.onclick = function close(e) {
    if (e.target == popupBtn) {
        popupBtn.style.display = "none";
    }
}

//登入抓取資料
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
            // console.log($('#member_name'));
            // console.log($('#vip_personal_icon'));
            // console.log($('#game_score'));

            $('#title_name').html(response[0]['MEMBER_NAME'] + "的個人頁面" + "<span></span>");
            // $('#vip_personal_icon')[0].src = response[0]['MEMBER_PICTURE'];
            $('#game_score').html(response[0]['GAME_HIGHSCORE'] + "分");
            $('#member_name').html(response[0]['MEMBER_NAME']);
            $('#member_mail').html(response[0]['MEMBER_MAIL']);
            $('#member_id').html(response[0]['MEMBER_ID']);
            $('#member_coin').html(response[0]['CATOPIA_COIN'] + "點");
            $('#vip_personal_icon')[0].src = response[0]['MEMBER_PICTURE'];
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}



//更換頭貼
var change_head = document.getElementById('change_head');
change_head.addEventListener('click' , function(){
    change_cat_icon();
})
console.log($('#vip_personal_icon')[0].src);


function change_cat_icon(){
    $.ajax({
        method:'POST',
        url:'./API/vip_personal_cat_insert.php',
        data:{
            VIP_CAT_ICON: $('#vip_personal_icon')[0].src,
        },
        dataType:'text',
        success:function(response){
            // console.log($('#vip_personal_icon'));
            window.location.href = "./vip_personal.html";
            // $('#vip_personal_icon')[0].src = response[0]['MEMBER_PICTURE'];
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
     }
    })
}


let personal_icon_el = document.getElementsByClassName('personal_cat');
let display_cat = document.getElementById('equipment_cat');
// console.log(personal_icon_el[0].src);
for(i=0; i< personal_icon_el.length ; i++){
    personal_icon_el[i].addEventListener('click',function(e){
        console.log(e.target);
        display_cat.src = e.target.src;
    })
}

let confirm_cat_icon = document.getElementById('confirm_cat');
confirm_cat_icon.addEventListener('click',function(){
    $('#vip_personal_icon')[0].src = display_cat.src;
});
// function choose_cat(){

// }