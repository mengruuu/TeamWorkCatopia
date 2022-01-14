// var vm = new Vue({
//     el: '#app',
//     data: {
//         count: 6,
//     },
// });

// console.log(vm.$data.count);  //3
// console.log(vm.count);  //3

// 設定圖片存取陣列
// let img_299 = new Array(); 
// img_299[0] = "./images/gacha_299/gacha_299_a.png"; 
// img_299[1] = "./images/gacha_299/gacha_299_b.png"; 
// img_299[2] = "./images/gacha_299/gacha_299_c.png"; 
// img_299[3] = "./images/gacha_299/gacha_299_d.png"; 
// img_299[4] = "./images/gacha_299/gacha_299_e.png"; 
// img_299[5] = "./images/gacha_299/gacha_299_f.png"; 
// img_299[6] = "./images/gacha_299/gacha_299_g.png"; 
// img_299[7] = "./images/gacha_299/gacha_299_h.png"; 
// img_299[8] = "./images/gacha_299/gacha_299_i.png"; 

let img_299 = [];

//先把資料抓出來
function doQuery() {
    $.ajax({
        method: "GET",
        url: "API/gacha_299.php",
        data: {
            
        },
        dataType: "json",
        success: function (response) {
            for(let i = 0; i < response.length; i++){
                img_299.push(response[i]);
            }
            // img_299 = response;
            // console.log(img_299);
        },
        error: function (exception) {
            alert("發生錯誤: " + exception.status);
        },
    });
}
document.addEventListener('load', doQuery());


// alert(`
//     盲盒抽選步驟:
//     1.選擇299/399盲盒
//     2.(查看抽選清單--角色一覽表)
//     3.購買抽盒次數(僅限信用卡結帳)
//     4.結帳完成回來本網頁,點擊彩色盲盒
//     (灰色盲盒表示已被其他用戶抽走)
// `);

function doFirst(){
    let clickedImg = [];
    let color_image = document.getElementsByClassName('color_image');
    let index_number;
    let new_img_299 = [];

    //抽中商品彈窗相關變數
    let popupBtn1 = document.getElementById('background_pop1');
    let popupClick1 = document.getElementsByClassName('choose_box');
    let close1 = document.getElementById('close_btn1');
    let continue_btn1 = document.getElementById('continue_btn1');
    let A = document.getElementById('A');
    let imgA = A.firstElementChild;
    let gacha_box = document.getElementsByClassName('choose_box');

    //一進入頁面就會random好圖片順序
    for( i = 0; i < 9; i++){
        randomindex()
        new_img_299.push(img_299[index_number]);
        // console.log(new_img_299[i]['PRODUCT_PICTURE1']);
    };

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
        // console.log(index_number); //印出抽中圖片的index
        // return index_number;
    }

    let click_times = -1;
    //點箱子移除彩色圖片 增加灰色圖片 同時跳出抽選的商品彈窗
    for(let i = 0; i < color_image.length; i++){
        color_image[i].addEventListener("click", function(e){
            login_check();

            let gacha_box_c = gacha_box[i];
            let gray_image = './images/gacha_299/gacha_299_box_gray.png';
            let img = gacha_box_c.firstElementChild;
            
            
            if(e.target.classList.contains("-off")){  //判斷若為灰色箱子 只會alert 不會做動作
                alert('無法抽取灰色箱子');
            }else if(vm.count == 0){   //判斷抽取次數為零 只會alert 不會做動作
                alert('請購買抽盒次數');
                window.location.href='./gacha_cart_step1.html';
            }else{
                vm.count --;
                e.target.classList.add("-off");
                img.src = gray_image;
                popupBtn1.style.display = "block";
                click_times = click_times + 1;
                // console.log(click_times);
                // console.log("test");
                // console.log(new_img_299);
                // console.log(new_img_299[click_times]['PRODUCT_NAME']);

                // 抽到的商品寫進資料庫
                $.ajax({
                    method:'POST',
                    url:'./API/gacha_299_insert.php',
                    data:{
                        PRODUCT_NAME:new_img_299[click_times]['PRODUCT_NAME'],
                    },
                    dataType:'text',
                    // dataType:'json',
                    // processData: false,
                    // contentType: false,
                    success:function(response){
                        // console.log(response);
                    },
                    error: function(exception) {
                        alert("發生錯誤: " + exception.status);  //網路出錯的部分
                    }
                });
            };
        })
    };

    //點箱子前先塞好random出來的第一張彈窗圖片 每關掉一次彈窗 就換下一張圖
    let ology = 0;
    // console.log(ology);
    imgA.src = new_img_299[ology]['PRODUCT_PICTURE1'];
    // console.log(imgA.src);
    //關掉抽中彈窗      //每關掉一次彈窗 就換下一張圖
    continue_btn1.addEventListener("click", function(){
        popupBtn1.style.display = "none";
        ology = ology + 1;
        imgA.src = new_img_299[ology]['PRODUCT_PICTURE1'];
        // console.log(imgA.src);
    })
    
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
        };
    }
}


window.addEventListener('load',doFirst);