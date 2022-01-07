// var myGamePiece =[];
// var random_x;
// var random_time;
var score = 0;
var man_drawing = true;
var glass = [];
var heart_point = 3;
var cool_down = true;
var stop_game = false;


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

    flash = new drawText("閃現",myGameArea.width-50,300,'red');
    flash.fillStyle='red';


    //亂數X位置每1000毫秒變化一次
    random();
    setInterval(random,1000);
    

    //玻璃杯掉下
    setInterval(create_glass,random_time);
    

    //黑色方塊
    // myGamePiecePerson = new component(50,50,'black',300,(myGameArea.height - 50));
    
    man = new man_Image(120,80,250,myGameArea.height-80);

    
    //鍵盤左右移動
    document.addEventListener("keydown", function(e){
        console.log(e.which);

        //移動------------------------------------------
        if(man.x > -20){    //限制範圍
            if(e.keyCode == 37 ){
                // myGamePiecePerson.x -= 5;
                man_drawing = false;
                man.x -= 8;
            }
        }
        if(man.x < (canvas.width - man.width)+20){ //限制範圍
            if(e.keyCode == 39 ){
                // myGamePiecePerson.x += 5;
                man_drawing = true;
                man.x += 8;

                
            }
        }
        //-------------------------------------------------

        //瞬移技能-----------------------------------
        if(man_drawing && e.keyCode == 67 && cool_down){
            man.x += 150;
            if(man.x > (canvas.width-man.width + 20)){  //限制不能超出範圍
                man.x = canvas.width-man.width + 20;
            }
            cool_down = false;
            // console.log(cool_down);
            setTimeout(cool , 10000);
        }   
        if(!man_drawing && e.keyCode == 67 && cool_down){
            man.x -= 150;
            if(man.x < -20){
                man.x = -20;
            }
            cool_down = false;
            setTimeout(cool , 10000);
        }  
        //----------------------------------------------

        //加速------------------------------------------
        // if(e.keyCode == 86){
            
        // }


    });

// }

function drawText(text,x,y,color){
    context.font = '20px Calibri';
    context.fillText(text,x, y);
    context.fillStyle= color;
    this.update = function(text,x,y){ //定義更新函式內容 : 重新上色 重新放入位置,寬高
        context.fillText(text,x,y);
        // console.log("test");
    }
}

//建構函式 定義component的內容
// function component (width, height, color, x, y){  //建立掉落物品
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     context.fillStyle = color;
//     context.fillRect(this.x, this.y, this.width, this.height);
//     this.update = function(){ //定義更新函式內容 : 重新上色 重新放入位置,寬高
//         context.fillStyle = color;
//         context.fillRect(this.x, this.y, this.width, this.height);
//     }
    
//     //接住方塊的定義函式
//     this.catched = function(glass){
//         var glass_left = glass.x;
//         var glass_right = glass.x + (glass.width);
//         var glass_top = glass.y;
//         var glass_bottom = glass.y + (glass.height);

//         var man_left = this.x;
//         var man_right = this.x + (this.width);
//         var man_top = this.y;
//         var man_bottom = this.y + (this.height);
//         if(  ( (man_right > glass_left && glass_left> man_left) || (man_left< glass_right && glass_right< man_right) ) && (glass_bottom === man_top) ){
//             return true;
//         }else{
//            return false;
//         }
//     }
// } 

function random(){ 
    random_time = 2000 + Math.random()*500;//時間亂數
    if(score > 5){
        random_time = 1400 + Math.random()*500;//時間亂數
    }
    if(score > 10){
        random_time = 800 + Math.random()*500;//時間亂數
    }
    if(score > 15){
        random_time = 300 + Math.random()*500;//時間亂數
    }
    if(score > 20){
        random_time = Math.random()*500;//時間亂數
    }
    random_x = 30 + (Math.random()*canvas.width - 50);//X位置亂數
    // console.log(random_time);
}

// function create_components(){
//     myGamePiece.push(new component(30,30,'orange',random_x,0));
// }

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
    // this.src = './glass.png';
    // context.drawImage(glass_pic,-50,-10,30,40)
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
    // this.src = './man.png';
    // context.drawImage(man_pic,250,220,120,80)
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



//玻璃杯重畫更新函數
// function updated_glass() {  
//     context.drawImage(glass[0],glass[0].x,down_y,30,30);
//     down_y += 1;
//     ; //往下掉
// }



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



//清除+重畫 函式  
function updateGameArea(){ 
    clear();

    //橘色方塊掉落
    // for(i=0; i < myGamePiece.length; i++){
    //     myGamePiece[i].y +=1;
    //     myGamePiece[i].update();
    // }


    //玻璃杯重畫函式執行 並且往下掉
    for(i=0; i < glass.length; i++){
        // console.log(glass[i]);
        if(glass[i].y > (canvas.height - 50)){
            glass[i].broken_update(broken_glass,60,60);

            // console.log(glass[i].y);
        }else{
            if(score < 5){
                glass[i].y +=1;
                // console.log(score);

            }
            if(score < 10 && score >= 5){
                glass[i].y += 1.5;

            }
            if(score < 20 && score >= 10){
                glass[i].y += 2;

            }
            if(score >= 20){
                glass[i].y += 2.5;

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
    score_text.update("得分",canvas.width-50,200);
    score_point.update(score*10,canvas.width-40,220);

    //技能重畫
    flash.update("閃現",canvas.width-50,300);
    



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

            let popup_game_score = document.getElementById('popup_game_score');
            popup_game_score.innerHTML = (score * 10);
            let popup_game_coin = document.getElementById('popup_game_coin');
            popup_game_coin.innerHTML = score;
            let gameover_popupBtn = document.getElementById('gameover_background_pop');
            gameover_popupBtn.style.display = "block";

            break;
    }
    
    

    // if(myGamePiecePerson.catched(myGamePiece1)){
    //     score++;
    //     console.log(score);
    // };
    
    // for(i=0; i < myGamePiece.length; i++){
    //     if(myGamePiecePerson.catched(myGamePiece[i])){
    //         score++;
    //         console.log(score);
    //     }
    // }

    
    
    // for(i=0; i < glass.length; i++){
    //     if(glass[i].catched(glass[i])){
    //         score++;
    //         console.log(score);
    //     }
    //     else{
    //         // console.log("no");
    //     }
    // }

    // updated_glass(glass1);
}


// window.addEventListener('load', doFirst);
// doFirst();
