// alert(`
//     盲盒抽選步驟:
//     1.選擇299/399盲盒
//     2.(查看抽選清單--角色一覽表)
//     3.購買抽盒次數(僅限信用卡結帳)
//     4.結帳完成回來本網頁,點擊彩色盲盒
//     (灰色盲盒表示已被其他用戶抽走)
// `);

function doFirst(){

    //=========================以下舊JS===================================
    // //點箱子移除彩色圖片 增加灰色圖片
    // let color_image = document.getElementsByClassName('color_image');
    // // console.log(gacha_box_c);
    // for(let i = 0; i < color_image.length; i++){
    //     color_image[i].addEventListener("click", function(e){
    
    //         e.target.remove();
    
    //         //跳出彈窗
            
    //         let gacha_box_c = document.getElementsByClassName('choose_box')[i];
    //         let gray_image = "<img src='./images/gacha_299/gacha_299_box_gray.png' width= 150>";
    //         gacha_box_c.insertAdjacentHTML("afterbegin", gray_image);
    
    
    //     })
    // }
    //=========================以上舊JS===================================
    
    //查看抽選清單 彈窗
    let popupBtn = document.getElementById('background_pop');
    let popupClick = document.getElementById('popup_click');
    let popupClickRWD = document.getElementById('popup_click_rwd');
    let close = document.getElementById('close_btn');
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

    //========================點箱子換圖片+彈窗============================
    // 設定圖片存取陣列
    let img_299 = new Array(); 
    img_299[0] = "./images/gacha_299/gacha_299_a.png"; 
    img_299[1] = "./images/gacha_299/gacha_299_b.png"; 
    img_299[2] = "./images/gacha_299/gacha_299_c.png"; 
    img_299[3] = "./images/gacha_299/gacha_299_d.png"; 
    img_299[4] = "./images/gacha_299/gacha_299_e.png"; 
    img_299[5] = "./images/gacha_299/gacha_299_f.png"; 
    img_299[6] = "./images/gacha_299/gacha_299_g.png"; 
    img_299[7] = "./images/gacha_299/gacha_299_h.png"; 
    img_299[8] = "./images/gacha_299/gacha_299_i.png"; 

    let clickedImg = [];
    let color_image = document.getElementsByClassName('color_image');
    let index_number;

    //randomindex()會隨機抽出index數字 判斷數字有無重複
    function randomindex() {
        while(1){
            index_number = parseInt(Math.random() * 9);
    
            if(clickedImg.every(function(num,index){
                return num != index_number;
            })){
                clickedImg.push(index_number);
                break;
            }
        }
        console.log(index_number); //印出抽中圖片的index
        return index_number;
    }

    //不知道要幹嘛的function
    function every_check(value){
        value == index_number;
    }

    //抽中商品彈窗相關變數
    let popupBtn1 = document.getElementById('background_pop1');
    let popupClick1 = document.getElementsByClassName('choose_box');
    let close1 = document.getElementById('close_btn1');
    let A = document.getElementById('A');
    // let A = document.getElementsByClassName('A')[0];
    let imgA = A.firstElementChild;
    // console.log(imgA);

    //點箱子移除彩色圖片 增加灰色圖片 同時跳出抽選的商品彈窗
    for(let i = 0; i < color_image.length; i++){
        color_image[i].addEventListener("click", function(e){
            let gacha_box_c = document.getElementsByClassName('choose_box')[i];
            let gray_image = './images/gacha_299/gacha_299_box_gray.png';
            let img = gacha_box_c.firstElementChild;

            //判斷若為灰色箱子 只會alert 不會做動作
            if(e.target.classList.contains("-off")){
                alert('無法抽取灰色箱子');
            }else{
                e.target.classList.add("-off");
                img.src = gray_image;
                popupBtn1.style.display = "block";
                randomindex();
                // console.log(img_number);
                imgA.src = img_299[index_number];
                // A.firstElementChild.src = img_299[index_number];
            };
        })
    };

    close1.onclick = function close() {
        popupBtn1.style.display = "none";
    }
    window.onclick = function close(e) {
        if (e.target == popupBtn1) {
            popupBtn1.style.display = "none";
        }
    }
    

}


window.addEventListener('load',doFirst);
