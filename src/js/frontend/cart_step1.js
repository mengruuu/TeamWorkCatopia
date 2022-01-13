const bus = new Vue();
Vue.component('cart-title',{
    template: `
    <div class="cart_step1_title">
        <div class="cart_step1_item">
            <p>商品</p>
        </div>
        <div class="cart_step1_type">
            <p>規格</p>
        </div>
        <div class="cart_step1_number">
            <p>數量</p>
        </div>
        <div class="cart_step1_price">
            <p>單價</p>
        </div>
    </div>
`
});

Vue.component('cart-product',{
    data(){
        return {
            products:[],
            products_img:[],
            products_quantity:[],
            products_price:[],
            total_price:0,
            delete_product:false,
            delete_product_ID:0,
        };
    },
    methods: {
        change(){
            // this.products.splice(1,1);
            // console.log(this.total_price);
            // console.log("change");
            this.total_price = 0;
            for(i=0; i < this.products.length ; i++){
                this.total_price += this.products_price[i] * this.products_quantity[i];
                if(this.products_quantity[i] == 0){
                    this.delete = confirm("確認要刪除此商品嗎?");
                      if(this.delete){
                        $.ajax({
                            method:'POST',
                            url:'./API/shopping_cart_delete.php',
                            data:{
                                product_ID:this.products[i]['PRODUCT_ID'],
                            },
                            dataType:'json',
                            success:function(response){
                                console.log('傳送成功');
                            },
                            error: function(exception) {
                             alert("發生錯誤: " + exception.status); 
                         }
                        })
                          
                          
                        this.delete_product = false;
                          this.products.splice(i,1);
                          this.products_img.splice(i,1);
                          this.products_price.splice(i,1);
                          this.products_quantity.splice(i,1);
                          console.log('刪除商品');

                      }else{
                        this.products_quantity[i] = 1;
                        this.total_price += this.products_price[i] * this.products_quantity[i];
                    }
                }
            }


            
        }
    },
    template:`
        <div>
            <div>
                <div class="cart_step1_buy_item1" v-for="(product,index) in products" :key= "product[index]">
                    <div class="cart_step1_item">
                        <img v-bind:src="products_img[index]">
                        <p>商品名稱:{{products[index]['PRODUCT_NAME']}}</p>
                    </div>
                    <div class="cart_step1_type">
                        <p>{{products[index]['PRODUCT_TYPE_NAME']}}</p>
                    </div>
                    <div class="cart_step1_number">
                        <p>
                            <input type="number" v-model="products_quantity[index]" @change="change">
                        </p>
                    </div>
                    <div class="cart_step1_price">
                        <p>{{products[index]['PRODUCT_PRICE']}}</p>
                    </div>
                </div>
            </div>
            <cart-total :totalPrice= "total_price" :products="products" :products_quantity = "products_quantity"></cart-total>
        </div>
    `,
    
    mounted() {
        fetch('./API/shopping_cart.php').then(res => res.json()).then(res =>{
            // console.log(res);
            this.products = res;
            // console.log(this.products);
            // console.log(this.products[0]['PRODUCT_NAME']);
            for(i=0; i < res.length ; i++){
                this.products_img.push(res[i]['PRODUCT_PICTURE1']);
                this.products_quantity.push(res[i]['PRODUCT_QUANTITY']);
                this.products_price.push(res[i]['PRODUCT_PRICE']);
                this.total_price += res[i]['PRODUCT_PRICE'] * res[i]['PRODUCT_QUANTITY'];
            }
            // console.log(this.total_price);
            // this.Product_ID = res[0]['PRODUCT_ID'];
        }).catch(function(err){
            console.log('no data found');
        })

        // bus.$emit('total',this.products_price);
        // console.log('cart-product-content');
    },
    
});


Vue.component('cart-total',{
    props:['totalPrice','products','products_quantity'],
    data(){
        return{
            catopia_coin:0,
            discount_coin:0,
            // left_coin: ,

        };
    },
    methods: {
        price_coin(){
            this.discount_coin = this.discount_coin.replace(/[^0-9\\.]+/g, 0);
            console.log('ooo');
        
            console.log('test')
            if(parseInt(this.discount_coin) > parseInt(this.catopia_coin)){
                alert('請輸入小於'+ this.catopia_coin + '的點數')
                this.discount_coin = this.catopia_coin;
                console.log('ttt')
            }
            if(parseInt(this.discount_coin) < 0){
                this.discount_coin = 0;
            } 
        },
        getData(){
            console.log(this.products);
            $.ajax({
                method:'POST',
                url:'./API/shopping_cart_update.php',
                data:{
                    Products:this.products,
                    Totalprice:this.totalPrice,
                    discount_coin:this.discount_coin,
                    products_quantity:this.products_quantity,
                },
                dataType:'json',
                success:function(response){
                    console.log(response);
                    window.location.href = "./cart_step2.html";
                },
                error: function(exception) {
                 alert("發生錯誤了: " + exception.status); 
             }
            })
        }
    },
    template:`
    <div>
        <div class="cart_step1_total_price">
            <div class="cart_step1_item_total_price">
                <p>商品總額</p>
                <p>{{this.totalPrice}}元</p>
            </div>
            <div class="cart_step1_fee">
                <p>運費</p>
                <p>0元</p>
            </div>
        </div>

    <div class="cart_step1_total_price">
        <div class="cart_step1_point">
            <p>您的點數</p>
            <p>{{this.catopia_coin}}點</p>
        </div>
        <div class="cart_step1_point">
            <p>點數折抵</p>
            <p><input type="text" v-model=discount_coin @change="price_coin">點</p>
        </div>
    </div>

    <div class="cart_step1_total_price">
        <div class="cart_step1_order_price">
            <p>訂單總額</p>
            <p>{{this.totalPrice - discount_coin}}元</p>
        </div>
    </div>
    </div>
    <div class="cart_step1_next_step">
            <a><button type="button" @click="getData">STEP2&nbsp;聯絡人資料</button></a>
    </div>
    `,
    // created(){
    //     // console.log('testttt')
    //     bus.$on('total',function(price){
    
    //         this.total_price = price;
    //         console.log(this.total_price);
    //         console.log('created_price');
    //     })
    // },
    mounted(){
        fetch('./API/get_member_info.php').then(res => res.json()).then(res =>{
            console.log(res);
            this.catopia_coin = res[0]['CATOPIA_COIN'];
            console.log(this.catopia_coin);
        })
        // bus.$on('total',function(price){
    
        //     this.total_price = price;
        //     console.log(this.total_price);
        //     console.log('mounted_price');

        // })
        // for(i=0; i < this.total_price.length ; i++){
        //     this.Allprice = this.Allprice + parseInt(this.total_price[i]);
        //     // console.log(this.Allprice);
        //     // console.log('mounted');
        //     // console.log(this.total_price);
        // }
        // // console.log(this.total_price);
        // console.log("cart-total");
    },
    // watch: {
    //     total_price: {
    //         handler(newVal){
    //             // bus.$on('total',function(price){
    //             alert(newVal);
    //         },
    //         immediate: false,
    //     },
    //     // $.ajax({
    //     //     url:,
    //     //     data:{
    //     //         ans:this.total_price,
    //     //     },
    //     // })
    // },
});

let vm = new Vue({
    el:'#cart_app',
    data:{

    },
});

// let vm2 = new Vue({
//     el:'#cart_step1_next_step',
//     data:{

//     },
//     methods: {

//     },
//     template:`
//         <div class="cart_step1_next_step">
//             <a href="./cart_step2.html"><button type="button" >STEP2<br>聯絡人資料</button></a>
//         </div>
//     `
// })