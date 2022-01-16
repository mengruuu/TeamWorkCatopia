var vm = new Vue({
    el: '#app',
    data: {
        count: 0,
    },
});

let buy_box = document.getElementById('buy_box');
buy_box.addEventListener('click',function(){
    vm.count += 1;
    // console.log(vm.count);
})

// 設定圖片存取陣列
// let img_399 = new Array(); 
// img_399[0] = "./images/gacha_399/gacha_399_a.png"; 
// img_399[1] = "./images/gacha_399/gacha_399_b.png"; 
// img_399[2] = "./images/gacha_399/gacha_399_c.png"; 
// img_399[3] = "./images/gacha_399/gacha_399_d.png"; 
// img_399[4] = "./images/gacha_399/gacha_399_e.png"; 
// img_399[5] = "./images/gacha_399/gacha_399_f.png"; 
// img_399[6] = "./images/gacha_399/gacha_399_g.png"; 
// img_399[7] = "./images/gacha_399/gacha_399_h.png"; 
// img_399[8] = "./images/gacha_399/gacha_399_i.png"; 

let img_399 = [];

//先把資料抓出來
function doQuery() {
    $.ajax({
        method: "GET",
        url: "API/gacha_399.php",
        data: {
            
        },
        dataType: "json",
        success: function (response) {
            for(let i = 0; i < response.length; i++){
                img_399.push(response[i]);
            }
            // img_399 = response;
            // console.log(img_399);
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
    let new_img_399 = [];
    
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
        new_img_399.push(img_399[index_number]);
        // console.log(new_img_399[i]['PRODUCT_PICTURE1']);
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
            // login_check();
            let gacha_box_c = gacha_box[i];
            let gray_image = './images/gacha_399/gacha_399_box_gray.png';
            let img = gacha_box_c.firstElementChild;

            if(e.target.classList.contains("-off")){      //判斷若為灰色箱子 只會alert 不會做動作
                alert('無法抽取灰色箱子');
            }else if(vm.count == 0){   //判斷抽取次數為零 只會alert 不會做動作
                alert('請購買抽盒次數');
                // window.location.href='./gacha_cart_step1.html';
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
                    url:'./API/gacha_399_insert.php',
                    data:{
                        PRODUCT_NAME:new_img_399[click_times]['PRODUCT_NAME'],
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
    imgA.src = new_img_399[ology]['PRODUCT_PICTURE1'];
    // console.log(imgA.src);
    //關掉抽中彈窗      //每關掉一次彈窗 就換下一張圖
    continue_btn1.addEventListener("click", function(){
        popupBtn1.style.display = "none";
        ology = ology + 1;
        imgA.src = new_img_399[ology]['PRODUCT_PICTURE1'];
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