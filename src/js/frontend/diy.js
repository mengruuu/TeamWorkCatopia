let diy_cake = document.getElementById("diy_cake");  //最後印出來的蛋糕內容 
// console.log(diy_cake);

//客製蛋糕
let diy_step_block = document.getElementById("diy_step_block");  //變換步驟的範圍 
let diy_flavor_block = document.getElementById("diy_flavor_block");  //變換口味選擇的範圍 
let back_btn = document.getElementById("back_btn");  //上一步按鈕 
let next_btn = document.getElementById("next_btn");  //下一步按鈕 
// console.log(back);
let diy_block_number = 0

judge_diy_block_number0();
change_cake();

//上一步按鈕的出現和消失
function judge_diy_block_number0(){
    if(diy_block_number != 0){
        back_btn.style.display = 'flex';
    }else{
        back_btn.style.display = 'none';
    }
}
//下一步按鈕的出現和消失
function judge_diy_block_number2(){
    if(diy_block_number != 2){
        next_btn.innerHTML = '';
        next_btn.innerHTML = `<img src="./images/diy_page/icon/diy_right.png" alt="">/
        <p id="next">下一步</p>`;
        next_btn.style.display = 'flex';
    }else{
        // next_btn.style.display = 'none';
        next_btn.innerHTML = '';
        next_btn.innerHTML = `<p id="buy">加入購物車</p>`;
        // next_btn.innerHTML = `<p id="buy" onclick="login_check_no_direct()">加入購物車</p>`;
        add_cart()
    }
}
//step 1.2.3.的出現和消失
function diy_step_context(){
    if(diy_block_number == 2){
        diy_step_block.innerHTML = '';
        diy_step_block.innerHTML = `<p>step3</p>/
        <p>選擇營養品</p>/
        <p>（二擇一）</p>`;
    }else if(diy_block_number == 1){
        diy_step_block.innerHTML = '';
        diy_step_block.innerHTML = `<p>step2</p>/
        <p>選擇健康配料</p>/
        <p>（三擇一）</p>`;
    }else{
        diy_step_block.innerHTML = '';
        diy_step_block.innerHTML = `<p>step1</p>/
        <p>選擇美味蛋糕體</p>/
        <p>（三擇一）</p>`;
    }
}
//step 1.2.3.<口味選擇>的出現和消失
function diy_step_flavor(){
    if(diy_block_number == 2){
        diy_flavor_block.innerHTML = '';
        diy_flavor_block.innerHTML = `<p id="nutrition_cranberry">照顧泌尿道蔓越莓</p>/
        <p id="nutrition_sesame">補鈣黑芝麻</p>`;
        change_nutrition()
    }else if(diy_block_number == 1){
        diy_flavor_block.innerHTML = '';
        diy_flavor_block.innerHTML = `<p id="food_blueberry">酸甜藍莓</p>/
        <p id="food_sweet_potato">香甜地瓜</p>/
        <p id="food_grass">新鮮貓草</p>`;
        let change_cake_img = document.getElementById("change_cake_img");
        change_food()
    }else{
        diy_flavor_block.innerHTML = '';
        diy_flavor_block.innerHTML = `<p id="cake_salmon">挪威進口鮭魚</p>/
        <p id="cake_tuna">加拿大鮪魚</p>/
        <p id="cake_chicken">台灣優質雞胸肉</p>`;
        change_cake();
    }
}

// console.log(diy_flavor_block);

back_btn.addEventListener('click', function(){
    diy_block_number -= 1 ;
    judge_diy_block_number0();
    judge_diy_block_number2();
    diy_step_context();
    diy_step_flavor();
    // console.log(cakeNUM + foodNUM + nutritionNUM);
    // console.log(diy_cake);
    // console.log(diy_block_number);
    // console.log(diy_flavor_block);
})
next_btn.addEventListener('click', function(){
    diy_block_number += 1 ;
    judge_diy_block_number0();
    judge_diy_block_number2();
    diy_step_context();
    diy_step_flavor();
    // console.log(cakeNUM + foodNUM + nutritionNUM);
    // console.log(diy_cake);
    // console.log(diy_block_number);
    // console.log(diy_flavor_block);
})

let cakeNUM = "1" ;
function change_cake(){
    //換蛋糕體
    let change_cake_img = document.getElementById("change_cake_img");
    let cake_tuna = document.getElementById("cake_tuna");
    let cake_salmon = document.getElementById("cake_salmon");
    let cake_chicken = document.getElementById("cake_chicken");
    
    cake_salmon.addEventListener('click', function(){
        change_cake_img.src = "./images/diy_page/images/diy_cake_salmon.png";
        cakeNUM = "1" ;
        cake_salmon.style.backgroundColor = "#B7C88E";
        cake_tuna.style.backgroundColor = "#EAE4D2";
        cake_chicken.style.backgroundColor = "#EAE4D2";
    })
    cake_tuna.addEventListener('click', function(){
        change_cake_img.src = "./images/diy_page/images/diy_cake_tuna.png";
        cakeNUM = "2" ;
        cake_tuna.style.backgroundColor = "#B7C88E";
        cake_salmon.style.backgroundColor = "#EAE4D2";
        cake_chicken.style.backgroundColor = "#EAE4D2";
    })
    cake_chicken.addEventListener('click', function(){
        change_cake_img.src = "./images/diy_page/images/diy_cake_chicken.png";
        cakeNUM = "3" ;
        cake_chicken.style.backgroundColor = "#B7C88E";
        cake_salmon.style.backgroundColor = "#EAE4D2";
        cake_tuna.style.backgroundColor = "#EAE4D2";
    })
}

let foodNUM = "1" ;
function change_food(){
    //換食物配料
    let change_food_img = document.getElementById("change_food_img");
    let food_blueberry = document.getElementById("food_blueberry");
    let food_sweet_potato = document.getElementById("food_sweet_potato");
    let food_grass = document.getElementById("food_grass");
    
    food_blueberry.addEventListener('click', function(){
        change_food_img.src = "./images/diy_page/images/diy_food_blueberry.png";
        foodNUM = "1" ;
        food_blueberry.style.backgroundColor = "#B7C88E";
        food_sweet_potato.style.backgroundColor = "#EAE4D2";
        food_grass.style.backgroundColor = "#EAE4D2";
    })
    food_sweet_potato.addEventListener('click', function(){
        change_food_img.src = "./images/diy_page/images/diy_food_sweet_potato.png";
        foodNUM = "2" ;
        food_sweet_potato.style.backgroundColor = "#B7C88E";
        food_blueberry.style.backgroundColor = "#EAE4D2";
        food_grass.style.backgroundColor = "#EAE4D2";
    })
    food_grass.addEventListener('click', function(){
        change_food_img.src = "./images/diy_page/images/diy_food_grass.png";
        foodNUM = "3" ;
        food_grass.style.backgroundColor = "#B7C88E";
        food_sweet_potato.style.backgroundColor = "#EAE4D2";
        food_blueberry.style.backgroundColor = "#EAE4D2";
    })
}

let nutritionNUM = "1" ;
function change_nutrition(){
    //換營養品
    let change_nutrition_img = document.getElementById("change_nutrition_img");
    let nutrition_cranberry = document.getElementById("nutrition_cranberry");
    let nutrition_sesame = document.getElementById("nutrition_sesame");
    
    nutrition_cranberry.addEventListener('click', function(){
        change_nutrition_img.src = "./images/diy_page/images/diy_nutrition_cranberry.png";
        nutritionNUM = "1" ;
        nutrition_cranberry.style.backgroundColor = "#B7C88E";
        nutrition_sesame.style.backgroundColor = "#EAE4D2";
    })
    nutrition_sesame.addEventListener('click', function(){
        change_nutrition_img.src = "./images/diy_page/images/diy_nutrition_sesame.png";
        nutritionNUM = "2" ;
        nutrition_sesame.style.backgroundColor = "#B7C88E";
        nutrition_cranberry.style.backgroundColor = "#EAE4D2";
    })
}

function add_cart(){
    //加入購物車
    let buy = document.getElementById("buy");
    
    buy.addEventListener('click', function(){
        // alert(cakeNUM + foodNUM + nutritionNUM);
        let cake_feature = cakeNUM + foodNUM + nutritionNUM;
        // console.log(cake_feature);
        let diy_cake_array = [];
        //輸出客製蛋糕代號 
        $.ajax({
            // async:  false,
            method: "POST",
            url: "API/diy_cake_select.php",
            data: {
                PRODUCT_FEATURE = cake_feature,
            },
            dataType: "json",
            // dataType: "text",
            success: function (response) {
                for(let i = 0; i < response.length; i++){
                    diy_cake_array.push(response[i]);
                }
                // console.log(diy_cake_array[0]);
                console.log(diy_cake_array[0].PRODUCT_NAME);        //拿出客製蛋糕商品名字
                console.log(diy_cake_array[0].PRODUCT_ID);        //拿出客製蛋糕商品ID

                let cake_product_id = diy_cake_array[0].PRODUCT_ID;
                console.log(cake_product_id);
                // console.log(diy_cake_array[0].PRODUCT_FEATURE);

                login_check_no_direct(cake_product_id);
                // login_add_cart();

                // console.log("加入購物車函式");
                // $.ajax({
                //     method:'POST',
                //     url:'./API/addshopping_cart.php',
                //     data:{
                //         quantity:1,
                //         product_ID:cake_product_id,
                //     },
                //     dataType:'json',
                //     success:function(response){
                //         console.log(response);
                //         alert("已成功加入購物車")
                //         window.location.href = "./diy.html";
                //     },
                //     error: function(exception) {
                //         alert("發生錯誤: " + exception.status); 
                //     }
                // })

            },
            error: function (exception) {
                alert("HISTORY_HIGHSCORE發生錯誤: " + exception.status);
            },
        });

        // window.location.href = "./diy.html";
        // window.location.href = "./cart_step1.html";
    })
}

//全部重選
let reset = document.getElementById("reset");
let change_cake_img = document.getElementById("change_cake_img");
let change_food_img = document.getElementById("change_food_img");
let change_nutrition_img = document.getElementById("change_nutrition_img");
reset.addEventListener('click', function(){
    change_cake_img.src = "./images/diy_page/images/diy_cake_salmon.png";
    change_food_img.src = "./images/diy_page/images/diy_food_blueberry.png";
    change_nutrition_img.src = "./images/diy_page/images/diy_nutrition_cranberry.png";
    diy_block_number = 0 ;
    judge_diy_block_number0();
    judge_diy_block_number2();
    diy_step_context();
    diy_step_flavor();
})

//抓出客製蛋糕的PRODUCT資料表的資料


//加入購物車
function login_check_no_direct(cake_product_id){
    let login;
    fetch('./API/login_check.php').then(res => res.json()).then(res =>{
        if(res == ""){
            console.log('沒登入');
            login = false;
        }else{
            console.log('登入中');
            login = true;
            login_add_cart(cake_product_id);
        }
    }).catch(function(err){
        console.log('no data found');
    })
}
  
function login_add_cart(cake_product_id){
    console.log("加入購物車函式");
    $.ajax({
        method:'POST',
        url:'./API/addshopping_cart.php',
        data:{
            quantity:1,
            product_ID:cake_product_id,
        },
        dataType:'json',
        success:function(response){
            console.log(response);
            alert("已成功加入購物車")
            window.location.href = "./diy.html";
        },
        error: function(exception) {
            alert("發生錯誤: " + exception.status); 
        }
    })
}







//輪播套件
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".button-prev",
    prevEl: ".button-next",
  },
});
var popupBtn = document.getElementsByClassName("background_pop")[0];
var close = document.getElementById("close_btn");
let background = document.querySelector(".background");
function show() {
  popupBtn.style.display = "block";
  background.classList.toggle("on");
}
close.onclick = function close() {
  popupBtn.style.display = "none";
  background.classList.toggle("on");
};
window.addEventListener(
  "click",
  function (e) {
    if (background.classList.contains("on") && e.target == background) {
      popupBtn.style.display = "none";
      background.classList.toggle("on");
    }
  },
  true
);
