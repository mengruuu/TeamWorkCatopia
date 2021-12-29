// alert(`
//     盲盒抽選步驟:
//     1.選擇299/399盲盒
//     2.(查看抽選清單--角色一覽表)
//     3.購買抽盒次數(僅限信用卡結帳)
//     4.結帳完成回來本網頁,點擊彩色盲盒
//     (灰色盲盒表示已被其他用戶抽走)
// `);

function doFirst(){

    //點箱子移除彩色圖片 增加灰色圖片
    let color_image = document.getElementsByClassName('color_image');
    // console.log(gacha_box_c);
    for(let i = 0; i < color_image.length; i++){
        color_image[i].addEventListener("click", function(e){
    
            e.target.remove();
    
            //跳出彈窗
            
            let gacha_box_c = document.getElementsByClassName('choose_box')[i];
            let gray_image = "<img src='./images/gacha_299/gacha_299_box_gray.png' width= 150>";
            gacha_box_c.insertAdjacentHTML("afterbegin", gray_image);
    
    
        })
    }
    
    //查看抽選清單 彈窗
    var popupBtn = document.getElementById('background_pop');
    var popupClick = document.getElementById('popup_click');
    var popupClickRWD = document.getElementById('popup_click_rwd');
    var close = document.getElementById('close_btn');
    popupClick.addEventListener('click', function(){
        popupBtn.style.display = "block";
        // console.log('test');
    })
    popupClickRWD.addEventListener('click', function(){
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

}


window.addEventListener('load',doFirst);
