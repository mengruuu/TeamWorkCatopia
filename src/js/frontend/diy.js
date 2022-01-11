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
        change_food()
    }else{
        diy_flavor_block.innerHTML = '';
        diy_flavor_block.innerHTML = `<p id="cake_salmon">挪威進口鮭魚</p>/
        <p id="cake_tuna">加拿大鮪魚</p>/
        <p id="cake_chicken">台灣優質雞胸肉</p>`;
        change_cake()
    }
}

// console.log(diy_flavor_block);

back_btn.addEventListener('click', function(){
    diy_block_number -= 1 ;
    judge_diy_block_number0();
    judge_diy_block_number2();
    diy_step_context()
    diy_step_flavor()
    // console.log(diy_cake);
    // console.log(diy_block_number);
    // console.log(diy_flavor_block);
})
next_btn.addEventListener('click', function(){
    diy_block_number += 1 ;
    judge_diy_block_number0();
    judge_diy_block_number2();
    diy_step_context()
    diy_step_flavor()
    // console.log(diy_cake);
    // console.log(diy_block_number);
    // console.log(diy_flavor_block);
})

function change_cake(){
    //換蛋糕體
    let change_cake_img = document.getElementById("change_cake_img");
    let cake_tuna = document.getElementById("cake_tuna");
    let cake_salmon = document.getElementById("cake_salmon");
    let cake_chicken = document.getElementById("cake_chicken");
    
    cake_tuna.addEventListener('click', function(){
        change_cake_img.src = "./images/diy_page/images/diy_cake_tuna.png";
    })
    cake_salmon.addEventListener('click', function(){
        change_cake_img.src = "./images/diy_page/images/diy_cake_salmon.png";
    })
    cake_chicken.addEventListener('click', function(){
        change_cake_img.src = "./images/diy_page/images/diy_cake_chicken.png";
    })
}

function change_food(){
    //換食物配料
    let change_food_img = document.getElementById("change_food_img");
    let food_blueberry = document.getElementById("food_blueberry");
    let food_sweet_potato = document.getElementById("food_sweet_potato");
    let food_grass = document.getElementById("food_grass");
    
    food_blueberry.addEventListener('click', function(){
        change_food_img.src = "./images/diy_page/images/diy_food_blueberry.png";
        change_food_img.style.display = "block";
    })
    food_sweet_potato.addEventListener('click', function(){
        change_food_img.src = "./images/diy_page/images/diy_food_sweet_potato.png";
        change_food_img.style.display = "block";
    })
    food_grass.addEventListener('click', function(){
        change_food_img.src = "./images/diy_page/images/diy_food_grass.png";
        change_food_img.style.display = "block";
    })
}

function change_nutrition(){
    //換營養品
    let change_nutrition_img = document.getElementById("change_nutrition_img");
    let nutrition_cranberry = document.getElementById("nutrition_cranberry");
    let nutrition_sesame = document.getElementById("nutrition_sesame");
    
    nutrition_cranberry.addEventListener('click', function(){
        change_nutrition_img.src = "./images/diy_page/images/diy_nutrition_cranberry.png";
        change_nutrition_img.style.display = "block";
    })
    nutrition_sesame.addEventListener('click', function(){
        change_nutrition_img.src = "./images/diy_page/images/diy_nutrition_sesame.png";
        change_nutrition_img.style.display = "block";
    })
}

function add_cart(){
    //加入購物車
    let buy = document.getElementById("buy");
    
    buy.addEventListener('click', function(){
        alert('加入成功');
        window.location.href = "./cart_step1.html";
    })
}

//全部重選
let reset = document.getElementById("reset");
let change_cake_img = document.getElementById("change_cake_img");
let change_food_img = document.getElementById("change_food_img");
let change_nutrition_img = document.getElementById("change_nutrition_img");
reset.addEventListener('click', function(){
    change_cake_img.src = "./images/diy_page/images/diy_cake_salmon.png";
    change_food_img.src = "";
    change_nutrition_img.src = "";
    diy_block_number = 0 ;
    judge_diy_block_number0();
    judge_diy_block_number2();
    diy_step_context();
    diy_step_flavor();
})




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
