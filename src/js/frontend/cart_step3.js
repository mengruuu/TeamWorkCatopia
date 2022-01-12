login_check();
get_product_info();
function get_product_info(){
    $.ajax({
        method:'POST',
        url:'./API/shopping_cart.php',
        data:{
        },
        dataType:'json',
        success:function(response){
            // console.log(response);
        },
        error: function(exception) {
         alert("發生錯誤: " + exception.status); 
        }
    })
}

Vue.component('confirm-title',{
    template:`
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
})
Vue.component('confirm-product',{
    data(){
        return{
            products:[],
            total_price:0,
            discount_coin:0
        };
    },
    template:`
    <div>
        <div>
            <div class="cart_step1_buy_item1" v-for="(product,index) in products">
                <div class="cart_step1_item">
                    <img v-bind:src="products[index]['PRODUCT_PICTURE1']">
                    <p>商品名稱:{{products[index]['PRODUCT_NAME']}}</p>
                </div>
                <div class="cart_step1_type">
                    <p>{{products[index]['PRODUCT_TYPE_NAME']}}</p>
                </div>
                <div class="cart_step1_number">
                    <p>
                    {{products[index]['PRODUCT_QUANTITY']}}
                    </p>
                </div>
                <div class="cart_step1_price">
                    <p>{{products[index]['PRODUCT_PRICE']}}元</p>
                </div>
            </div>
        </div>
        <confirm-product-total :totalPrice="total_price" :discountCoin="discount_coin"></confirm-product-total>
    </div>
    `,
    mounted() {
        fetch('./API/shopping_cart.php').then(res => res.json()).then(res =>{
            console.log(res);
            this.products = res;
            this.total_price = res[0]['TOTAL_PRICE'];
            this.discount_coin = res[0]['DISCOUNT_COIN'];
        }).catch(function(err){
            console.log('no data found');
        })
    },
})

Vue.component('confirm-product-total',{
    props:['totalPrice','discountCoin'],
    data(){
        return{
            catopia_coin:0,

        };
    },
    template:`
    <div id="cart_total">
        <div class="cart_step1_total_price">
            <div class="cart_step1_item_total_price">
                <p>商品總額</p>
                <p>{{totalPrice}}元</p>
            </div>
            <div class="cart_step1_fee">
                <p>運費</p>
                <p>0元</p>
            </div>
        </div>

        <div class="cart_step1_total_price">
            <div class="cart_step1_point">
                <p>您的點數</p>
                <p>{{catopia_coin}}點</p>
            </div>
            <div class="cart_step1_point">
                <p>點數折抵</p>
                <p>{{discountCoin}}點</p>
            </div>
        </div>

        <div class="cart_step1_total_price">
            <div class="cart_step1_order_price">
                <p>訂單總額</p>
                <p>{{totalPrice}}元</p>
            </div>
        </div>
    </div>
    `,
    mounted() {
        fetch('./API/get_member_info.php').then(res => res.json()).then(res =>{
            // console.log(res);
            this.catopia_coin = res[0]['CATOPIA_COIN'];
            
        }).catch(function(err){
            console.log('no data found');
        })
    },
})






Vue.component('deliver-title',{
    template:`
        <div class="cart_step2_check_step">
            <p class="cart_step2_circle"></p>
            <p>聯絡・付款・配送資訊</p>
        </div>
    `
})
Vue.component('deliver-content',{
    data(){
        return{
            member_name:"",
            member_phone:"",
            order_name:"",
            order_phone:"",
            payment_method:"",
            deliver_way:"",
            deliver_address:"",
            order_info:[]
            
        }
    },
    template:`
    <div>
        <div class="cart_step2_order_check">
            <div class="cart_step2_orderer">
                <p>聯絡・付款・配送資訊</p>
            </div>
            <div class="cart_step2_information">
                <p class="cart_step2_information_title">訂購人</p>
                <p>{{member_name}}</p>
                <br>
                <p class="cart_step2_information_title">訂購人連絡電話</p>
                <p>{{member_phone}}</p>
                <br>
                <p class="cart_step2_information_title">收件人</p>
                <p>{{order_name}}</p>
                <br>
                <p class="cart_step2_information_title">收件人連絡電話</p>
                <p>{{order_phone}}</p>
                <br>
                <p class="cart_step2_information_title">付款方式</p>
                <p>{{payment_method}}</p>
                <br>
                <p class="cart_step2_information_title">配送方式</p>
                <p>{{deliver_way}}</p>
                <p>{{deliver_address}}</p>
            </div>
        </div>
        <button-order :orderInfo="order_info"></button-order>
    </div>
    `,
    mounted() {
        fetch('./API/get_session_order_info.php').then(res => res.json()).then(res =>{
            // console.log(res);
            this.order_name = res[0];
            this.order_info.push(res[0]);

            this.order_phone =res[1];
            this.order_info.push(res[1]);

            this.payment_method = res[2];
            this.order_info.push(res[2]);

            this.deliver_way = res[3];
            this.order_info.push(res[3]);

            this.deliver_address = res[4];
            this.order_info.push(res[4]);

        }).catch(function(err){
            console.log('no dataa found');
        })
        fetch('./API/get_member_info.php').then(res => res.json()).then(res =>{
            this.member_name = res[0]['MEMBER_NAME'];
            this.order_info.push(res[0]['MEMBER_NAME']);

            this.member_phone = res[0]['MEMBER_PHONE'];
            this.order_info.push(res[0]['MEMBER_PHONE']);


        }).catch(function(err){
            console.log('no dataa found');
        })
    },
})
Vue.component('button-order',{
    props:['orderInfo'],
    data(){
        return{
            products_name:[],
            products_quantity:[],
            total_price:0,
            discount_coin:0,
            give_back_coin:0,
            order_ID:0,
        }
    },
    methods: {
        submit_order_data(){
            fetch('./API/cart_step3.php').then(res => res.json()).then(res =>{
                console.log(res);
                this.order_ID = parseInt(res[0]['last_insert_id()']);
                console.log(this.order_ID);

                $.ajax({
                    method:'POST',
                    url:'./API/cart_step3_delete_shopping.php',
                    data:{
                        
                    },
                    dataType:'json',
                    success:function(response){
                        console.log(response);

                    },
                    error: function(exception) {
                        alert("發生錯誤: " + exception.status); 
                        console.log(this);
                    }
                })

                
                $.ajax({
                    method:'POST',
                    url:'./API/cart_step3_order_detail.php',
                    data:{
                        ORDERID:this.order_ID,
                        products_name:this.products_name,
                        products_quantity:this.products_quantity,
                        order_info:this.orderInfo,
                    },
                    dataType:'json',
                    success:function(response){
                        console.log('order_deatil新增成功')
                        console.log(response);
                        window.location.href = `./cart_step4.html?orderID=${response}`;

                    },
                    error: function(exception) {
                        alert("發生錯誤: " + exception.status); 
                        console.log(this);
                    }
                })


                



            }).catch(function(err){
                console.log('no data found');
            })
        },

        
    },
    template:`
    <div class="cart_step1_next_step cart_step3_next_step">
        <a href="./cart_step2.html"><button type="button">上一步<br>修改資料</button></a>
        <a><button type="button" @click="submit_order_data">下一步<br>完成訂購</button></a>
    </div>
    `,
    mounted() {
        fetch('./API/cart_step3_select_shopping.php').then(res => res.json()).then(res =>{
            // console.log(res);

                for(i=0; i < res.length ; i++){
                    this.products_name.push(res[i]['PRODUCT_NAME']);
                    this.products_quantity.push(res[i]['PRODUCT_QUANTITY']);

                }
                this.total_price = res[0]['TOTAL_PRICE'];
                this.discount_coin = res[0]['DISCOUNT_COIN'];
                this.give_back_coin = parseInt(res[0]['TOTAL_PRICE']) / 10;
                // console.log(this.products_name);
        }).catch(function(err){
            console.log('no data found');
        })
    },
})


let vm = new Vue({
    el:'#confirmAPP',
    data:{

    },

})


let vm2 = new Vue({
    el:'#confirmDeliver',
    data:{

    },
})