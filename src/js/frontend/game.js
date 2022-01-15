var remember = false;
var score = 0;
var man_drawing = true;
var glass = [];
var heart_point = 3;
var cool_down = true;
var cool_down_acc = true;
var cool_down_slow = true;
var acc = false;
var slowly = false;
let accelerate = 0;
let slow = 0;
let slow_time = false;
var stop_game = false;
//每天寫三次
var today = new Date();
// var everyday_add_point_times = 3;



// function doFirst(){   
    let myGameArea = document.getElementById("canvas");
    context = myGameArea.getContext("2d");
    myGameArea.width = 1000;
    myGameArea.height = 450;
    myGameArea.interval = setInterval(updateGameArea,20);//每秒50次執行updateGameArea函式
    setInterval(splice_broken_glass,2500);
    
    score_text = new drawText("得分",myGameArea.width-50,200);
    score_point = new drawText(score,myGameArea.width-40,220);

    heart_pic = new Image(30,30,myGameArea.width-50,10);
    heart_pic2 = new Image(30,30,myGameArea.width-50,50);
    heart_pic3 = new Image(30,30,myGameArea.width-50,90);

    flash = new drawText("加速",myGameArea.width-50,300,'#774F40');
    flash.fillStyle='#774F40';


    //亂數X位置每1000毫秒變化一次
    random();
    setInterval(random,1000);
    

    //玻璃杯掉下
    setInterval(create_glass,random_time);
    

    
    man = new man_Image(120,80,250,myGameArea.height-80);

    
    //鍵盤左右移動
    document.addEventListener("keydown", function(e){
        // console.log(e.which);
        
        //移動------------------------------------------
        if(man.x > -20){    //限制範圍
            if(e.keyCode == 37 || remember){
                // myGamePiecePerson.x -= 5;
                man_drawing = false;
                if(score > 20){
                    man.x -= (11 + accelerate);
                }else{
                    man.x -= (8 + accelerate);
                }
                console.log(e.keyCode);
                remember = false;
            }
        }
        if(man.x < (canvas.width - man.width)+20){ //限制範圍
            if(e.keyCode == 39 || remember){
                // myGamePiecePerson.x += 5;
                man_drawing = true;
                if(score > 20){
                    man.x += (11 + accelerate);
                }
                man.x += (8 + accelerate);
                remember = false;

            }
        }
        //-------------------------------------------------

        //瞬移技能-----------------------------------
        if(man_drawing && e.keyCode == 67 && cool_down){
            remember = true;
            man.x += 350;
            if(man.x > (canvas.width-man.width + 20)){  //限制不能超出範圍
                man.x = canvas.width-man.width + 20;
            }
            cool_down = false;
            // console.log(cool_down);
            setTimeout(cool , 10000);
            // remember = false;
            console.log(remember);

        }   
        if(!man_drawing && e.keyCode == 67 && cool_down){
            remember = true;

            man.x -= 350;
            if(man.x < -20){
                man.x = -20;
            }
            cool_down = false;
            setTimeout(cool , 8000);
            // remember = false;
            console.log(remember);

        }  
        //----------------------------------------------

        //加速------------------------------------------
        if(e.keyCode == 86 && cool_down_acc){
            remember = true;
            acc = true;
            console.log('v')
            accelerate = 5;
            cool_down_acc = false;
           
            if(score > 15){
                setTimeout(accelerate_time,8000);
                setTimeout(cool_acc, 10000);
            }
            if(score > 20){
                setTimeout(accelerate_time,10000);
                setTimeout(cool_acc, 12000);
            }
            if(score <= 15){
                setTimeout(cool_acc, 8000);
                setTimeout(accelerate_time,5000);
            }
            // remember = false;

        }
        //緩速
        if(e.keyCode == 66 && cool_down_slow){
            slow_time = true;
            cool_down_slow = false;
            if(score < 5){
                slow = -0.5;
            }
            if(score < 10 && score >= 5){
                slow = -0.8;
            }
            if(score < 20 && score >= 10){
                slow = -1.2;
            }
            if(score > 20){
                slow = -1.2;
            }
            setTimeout(cool_slow, 8000);
            setTimeout(slowly_time,3500);
        }


    });

// }

function accelerate_time(){
    accelerate = 0;
    acc = false;
}
function slowly_time(){
    slow = 0;
    slowly = false;
}


function drawText(text,x,y,color){
    context.font = '18px Calibri';
    context.fillText(text,x, y);
    context.fillStyle= color;
    this.update = function(text,x,y){ //定義更新函式內容 : 重新上色 重新放入位置,寬高
        context.fillText(text,x,y);
        // console.log("test");
    }
}


function random(){ 
    // random_time = 2000 + Math.random()*500;//時間亂數

    if(score <= 5){
        random_time = 2000 + Math.random()*500;//時間亂數
    }
    if(score > 5){
        random_time = 1800 + Math.random()*500;//時間亂數
    }
    if(score > 10){
        random_time = 1500 + Math.random()*500;//時間亂數
    }
    if(score > 15){
        random_time = 1200 + Math.random()*500;//時間亂數
    }
    if(score > 20){
        random_time = 800 + Math.random()*500;//時間亂數
    }
    if(score > 25){
        random_time = -300 + Math.random()*500;//時間亂數
    }
    random_x = 30 + (Math.random()*canvas.width - 50);//X位置亂數
    // console.log(random_time);
}


function create_glass(){
    glass.push(new Image(30,30,random_x,0));
    // console.log(glass);
    // console.log(random_x);
    // console.log(random_time);

}

//玻璃杯函式
function Image (width, height,x, y){  
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.update = function(pic,width,height){ //玻璃杯重畫
        context.drawImage(pic, this.x, this.y, width,height);
    }
    this.broken_update = function(pic,width,height){ //玻璃杯重畫
        context.drawImage(pic, this.x, this.y, width,height);
    }
};
function man_Image (width, height,x, y){  //建立人物
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.update = function(pic){ //人物重畫
        context.drawImage(pic, this.x, this.y, 120,80);
    }

    //碰撞函式
    this.catched = function(glass){
        var glass_left = glass.x;
        var glass_right = glass.x + (glass.width);
        var glass_top = glass.y;
        var glass_bottom = glass.y + (glass.height);

        var man_left = this.x;
        var man_right = this.x + (this.width);
        var man_top = this.y;
        var man_bottom = this.y + (this.height);
        if(  ( (man_right > glass_left && glass_left> man_left) || (man_left< glass_right && glass_right< man_right) ) && (glass_bottom > man_top) ){
            return true;
        }else{
           return false;
        }
    }
};




//橡皮擦定義清除函式 清除ctx
function clear(){ 
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

//清除玻璃杯
function splice_glass(){
    glass.splice(i,1);
}
function splice_broken_glass(){
    for(i=0; i < glass.length; i++){
        if(glass[i].y > (canvas.height-50)){
            glass.splice(i,1);
            heart_point -- ;
            // console.log(heart_point);
        }
    }
}

//冷卻時間重置
function cool(){
    cool_down = true;
}
function cool_acc(){
    cool_down_acc = true;
}
function cool_slow(){
    cool_down_slow =true;
}

//清除+重畫 函式  
function updateGameArea(){ 
    clear();


    //玻璃杯重畫函式執行 並且往下掉
    for(i=0; i < glass.length; i++){
        // console.log(glass[i]);
        if(glass[i].y > (canvas.height - 50)){
            glass[i].broken_update(broken_glass,60,60);

            // console.log(glass[i].y);
        }else{
            if(score < 5){
                glass[i].y += (1 + slow);
                // console.log(score);

            }
            if(score < 10 && score >= 5){
                glass[i].y += (1.8 + slow);

            }
            if(score < 20 && score >= 10){
                glass[i].y += (2.2 + slow);

            }
            if(score >= 20){
                glass[i].y += (2.5 + slow);

                
            }
            if(score >= 30){
                glass[i].y += (3 + slow);

            }
            if(score >= 35){
                glass[i].y += (3.5 + slow);

            }
            glass[i].update(glass_pic,30,40);
        
        }
    }

    if(man_drawing){
        man.update(man_right); //人物重畫往右
    }else{
        man.update(man_left); //人物重畫往左
    }


    // myGamePiecePerson.update(); //黑色方塊重畫

    //碰撞執行
    for(i=0 ; i< glass.length; i++){
        if(man.catched(glass[i]) && (glass[i].y < canvas.height-50)){
            // console.log("test");
            splice_glass();
            score ++ ;
            // console.log(score);
        }
    }
    
    //分數重畫
    score_text.update("得分",canvas.width-50,150);
    score_point.update(score*10,canvas.width-40,170);

    //技能重畫
    flash.update("加速請按V",canvas.width-100,200);
    flash.update("瞬移請按C",canvas.width-100,220);
    flash.update("杯子緩速請按C",canvas.width-100,240);


    if(cool_down){
        flash.update("瞬移可使用",canvas.width-100,270);
    }else{
        flash.update("瞬移冷卻中...",canvas.width-100,270);
    }

    if(cool_down_acc){
        flash.update("加速可使用",canvas.width-100,290);
    }else{
        flash.update("加速冷卻中...",canvas.width-100,290);
    }

    if(acc){
        flash.update("加速中",canvas.width-100,420);
    }
    if(slowly){
        flash.update("緩速中",canvas.width-100,440);
    }


    

    switch(heart_point){
        case 3:
            heart_pic.update(heart,30,30);
            heart_pic2.update(heart,30,30);
            heart_pic3.update(heart,30,30);
            break;

        case 2:
            heart_pic.update(heart,30,30);
            heart_pic2.update(heart,30,30);
            heart_pic3.update(broken_heart,30,30);
            break;

        case 1:
            heart_pic.update(heart,30,30);
            heart_pic2.update(broken_heart,30,30);
            heart_pic3.update(broken_heart,30,30);
            break;

        case 0:
            // console.log("gameover");
            clearInterval(myGameArea.interval);

            // 心心變0時抓歷史最高分
            highscore = 0;
            HISTORY_HIGHSCORE();
            // console.log(highscore);

            let popup_game_score = document.getElementById('popup_game_score');
            popup_game_score.innerHTML = (score * 10);
            let popup_game_coin = document.getElementById('popup_game_coin');
            popup_game_coin.innerHTML = score;
            let gameover_popupBtn = document.getElementById('gameover_background_pop');
            gameover_popupBtn.style.display = "block";

            gameScore = score * 10;

            // console.log(gameScore);
            // console.log(highscore);
            // console.log(history_highscore);

            if(gameScore > highscore){
                HIGHSCORE();
                // console.log("分數高");
            }
            // else{
                // console.log("分數低");
            // }

            //遊戲結束當下時間的時間
            // 寫一個變數再storage 每玩一次+1 最多加兩次就不能玩
            // new Date(); //抓系統時間 開始遊戲和結束遊戲時比對時間ㄘ

            let add_point_btn = document.getElementById('add_point_btn');
            let add_point_time = 1;
            // console.log(add_point_time);

            add_point_btn.addEventListener('click' , function(){
                login_check();
                // console.log("test");
                if(add_point_time == 0){                    
                    alert('本次遊戲已兌換')
                }else{
                    addPoint();
                    alert('兌換成功')
                    add_point_time --;
                }
            })

            break;
    }

 

    //先把遊戲最高分抓出來
    function HISTORY_HIGHSCORE(){
        let history_highscore;
        $.ajax({
            method: "GET",
            url: "API/game_history_score.php",
            data: {
            },
            // dataType: "json",
            dataType: "text",
            success: function (response) {
                // alert(response);
                history_highscore = response;
                // alert(history_highscore);
            },
            error: function (exception) {
                alert("HISTORY_HIGHSCORE發生錯誤: " + exception.status);
            },
        });
        return history_highscore;
    }

    // 遊戲最高分有更新 寫進資料庫
    function HIGHSCORE() {
        $.ajax({
            method:'POST',
            url:'./API/game_score.php',
            data:{
                HIGHSCORE: gameScore,
            },
            dataType:'text',
            // dataType:'json',
            success:function(response){
                // console.log(response);
            },
            error: function(exception) {
                alert("HIGHSCORE發生錯誤: " + exception.status);  //網路出錯的部分
            }
        });
    }    

    // 遊戲賺到的奴幣寫進資料庫
    function addPoint() {
        $.ajax({
            method:'POST',
            url:'./API/game_point.php',
            data:{
                addCOIN:score,
            },
            dataType:'text',
            // dataType:'json',
            success:function(response){
                // console.log(response);
            },
            error: function(exception) {
                alert("發生錯誤: " + exception.status);  //網路出錯的部分
            }
        });
    }
    
    

}


// window.addEventListener('load', doFirst);
// doFirst();
