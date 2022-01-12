async function doQuery() {
  const data = await fetch('./Api/inside.php', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(location.search.replace("?id=", ""))
    })
    .then(res => res.json())
    .then(data => data);
  console.log(data);

  const vm = await new Vue({
    el: "#inside_first_block_commodity",
    data: {
      quantity: 1,
      money: data[0].PRODUCT_PRICE,
      select: "藍色",
      title: data[0].PRODUCT_NAME,
      content: data[0].PRODUCT_CONTENT,
      page_title: data[0].PRODUCT_TYPE_NAME
    },
    methods: {
      addCart() {
        const cart = {
          dataInfo: data[0],
          count: this.quantity,
          money: this.money
        };

        let repeat = false;

        let productsList = [];
        login_check_no_direct(cart);
        if(!(localStorage.getItem("cartContent"))) {
          productsList.push(cart);

          localStorage.setItem("cartContent", JSON.stringify(productsList));
        }else {
          productsList = JSON.parse(localStorage.getItem("cartContent"));

          for(let i = 0; i < productsList.length; i = i + 1) {
            if(productsList[i].dataInfo.PRODUCT_ID === cart.dataInfo.PRODUCT_ID) {
              productsList[i].count = Number(productsList[i].count) + Number(cart.count);

              String(productsList[i].count)

              localStorage.setItem("cartContent", JSON.stringify(productsList));

              repeat = true;

              break;
            }
          }

          if(repeat === false) {
            productsList.push(cart);

            localStorage.setItem("cartContent", JSON.stringify(productsList));
          }
        }
      }
    },
    computed: {
      numSquare() {
        return (this.quantity * this.money);
      },
    }
  })
  
  let big_img = document.getElementsByClassName("big_img")[0];
  let small_img = document.getElementsByClassName("small_img");




  small_img[0].style =
    "transform: scale(1.1);border:2px solid #774F40;border-radius: 5px;";

  big_img.src = data[0].PRODUCT_PICTURE1;

  for (let i = 0; i < small_img.length; i++) {
    small_img[i].src = data[0][`PRODUCT_PICTURE${i+1}`];
  }

  for (let i = 0; i < small_img.length; i++) {
    small_img[i].addEventListener("click", function () {
      big_img.src = small_img[i].src;
      for (let i = 0; i < small_img.length; i++) {
        small_img[i].style = "";
      }
      this.style = "transform: scale(1.1);border:2px solid #774F40;border-radius: 5px;";
    });
  }
}
document.addEventListener("load", doQuery());


function login_check_no_direct(cart){
  let login;
  fetch('./API/login_check.php').then(res => res.json()).then(res =>{
      if(res == ""){
          console.log('沒登入');
          login = false;
      }else{
          console.log('登入中');
          login = true;
          login_add_cart(cart);
      }
  }).catch(function(err){
      console.log('no data found');
  })

}

function login_add_cart(){
  console.log("加入購物車函式");
  let quantity = $('#quantity').val();
  console.log(quantity);
  console.log(typeof(quantity));
  let num = location.search.lastIndexOf('=');
  let ID = location.search.substring(num + 1);
  console.log('ID為' + ID);
    $.ajax({
      method:'POST',
      url:'./API/addshopping_cart.php',
      data:{
        quantity:quantity,
        product_ID:ID,
      },
      dataType:'json',
      success:function(response){
          console.log(response);
      },
      error: function(exception) {
      alert("發生錯誤: " + exception.status); 
      }
  })
}