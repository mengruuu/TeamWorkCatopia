login_check();
// get_order_detail();
function get_order_detail(){
    let num = location.search;
    // console.log(num);
    let order_ID = num.substring(1);
    // console.log(order_ID);
    return order_ID;
    
}

//商品資訊 component(上層)
Vue.component('vip-order-detail-container',{
    props:['detail'],
    data(){
        return{
        }
    },
    template:`
    <div class="vip_order_detail_container">
        <vip-order-detail-title></vip-order-detail-title>
        <vip-order-detail-buy-items :detail ="detail"></vip-order-detail-buy-items>
        <vip-order-detail-total :detail="detail"></vip-order-detail-total>
    </div>
    `,
    
})
//訂購詳細資訊 component(上層)
Vue.component('order-detail',{
    props:['detail'],
    data(){
        return{
            order_name:"",
            order_phone:"",
        }
    },
    template:`
    <div class="con">
        <div class="con_block">
            <div class="con_block_left">
                聯絡・付款・配送資訊
            </div>
            <div class="con_block_right">
                <div class="con_text">
                    <div class="order_person">
                        <span>訂購人</span>
                        <br>
                        {{order_name}}
                    </div>
                    <div class="order_ph">
                        <span>訂購人連絡電話</span>
                        <br>
                        {{order_phone}}
                    </div>
                    <br>
                    <div class="get_person">
                        <span>收件人</span>
                        <br>
                        {{detail[0]['RECIPIENT_NAME']}}
                    </div>
                    <div class="get_ph">
                        <span>收件人連絡電話</span>
                        <br>
                        {{detail[0]['RECIPIENT_PHONE']}}
                    </div>
                    <br>
                    <div class="pay">
                        <span>付款方式</span>
                        <br>
                        {{detail[0]['PAYMENT_METHOD']}}
                    </div>
                    <div class="transport">
                        <span>配送方式</span>
                        <br>
                        {{detail[0]['SHIPPING_METHOD']}}
                        <br>
                        {{detail[0]['SHIPPING_ADDRESS']}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    created() {
        fetch('./API/get_member_info.php',).then(res => res.json()).then(res =>{
            // console.log(res);
            this.order_name = res[0]['MEMBER_NAME'];
            this.order_phone = res[0]['MEMBER_PHONE'];
        }).catch(function(err){
            console.log('no data found');
        })
    },
})
//返回訂單component
Vue.component('back-to-order',{
    template:`
    <div class="bottom">
        <a href="vip_order.html"><button>返回訂單查詢</button></a>
    </div>
    `
})
//商品資訊 component(下層)

//商品標題
Vue.component('vip-order-detail-title',{
    template:`
    <div class="vip_order_detail_title">
        <div class="vip_order_detail_item">
            <p>商品</p>
        </div>
        <div class="vip_order_detail_type">
        </div>
        <div class="vip_order_detail_number">
            <p>數量</p>
        </div>
        <div class="vip_order_detail_price">
            <p>單價</p>
        </div>
    </div>
    `
})
//訂單商品內容
Vue.component('vip-order-detail-buy-items',{
    props:['detail'],
    data(){
        return{
            
        }
    },
    template:`
    <div>
        <div class="vip_order_detail_buy_item1" v-for ="(product,index) in detail">
            <div class="vip_order_detail_item">
                <img v-bind:src="detail[index]['PRODUCT_PICTURE1']">
                <p>{{detail[index]['PRODUCT_NAME']}}</p>
            </div>
            <div class="vip_order_detail_type">
                <p>{{detail[index]['PRODUCT_TYPE_NAME']}}</p>
            </div>
            <div class="vip_order_detail_number">
                <p>
                {{detail[index]['PRODUCT_QUANTITY']}}
                </p>
            </div>
            <div class="vip_order_detail_price">
                <p>{{detail[index]['PRODUCT_PRICE']}}</p>
            </div>
        </div>
    </div>
    `,
    mounted() {
        // console.log(this.orderID);
        // fetch('./API/get_order_detail.php',{
        //     method: 'POST',
        //     headers:{
        //         'content-type':'application/json'
        //     },
        //     body: JSON.stringify(this.orderID),
        // }).then(res => res.json()).then(res =>{
        //     // console.log(res);
        //     this.products = res;
        //     console.log(this.products);
        // }).catch(function(err){
        //     console.log('no data found');
        // })
    },
})
//訂單總額運費點數
Vue.component('vip-order-detail-total',{
    props:['detail'],
    template:`
    <div id="vip_order_detail_total">
        <div class="vip_order_detail_total_price">
            <div class="vip_order_detail_item_total_price">
                <p>商品總額</p>
                <p>{{parseInt(detail[0]['TOTAL_PRICE']) + parseInt(detail[0]['COIN_DISCOUNT'])}}元</p>
            </div>
            <div class="vip_order_detail_fee">
                <p>運費</p>
                <p>0元</p>
            </div>
        </div>

        <div class="vip_order_detail_total_price">
            <div class="vip_order_detail_point">
                <p>點數折抵</p>
                <p>{{detail[0]['COIN_DISCOUNT']}}點</p>
            </div>
        </div>

        <div class="vip_order_detail_total_price">
            <div class="vip_order_detail_order_price">
                <p>訂單總額</p>
                <p>{{detail[0]['TOTAL_PRICE']}}元</p>
            </div>
        </div>

        <div class="vip_order_detail_total_price">
            <div class="vip_order_detail_point">
                <p>回饋點數</p>
                <p>{{detail[0]['COIN_GIVEBACK']}}點</p>
            </div>
        </div>
    </div>
    `,
})


//最上層
let vm = new Vue({
    el:'#vip_order_detail',
    data:{
        order_ID:"",
        order_detail:[],
    },
    created() {
        this.order_ID = get_order_detail();
        // console.log(this.order_ID);
        $('#title_name').html("訂單編號:" + this.order_ID + "<span></span>");
    },
    mounted() {
        fetch('./API/get_order_detail.php',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(this.order_ID),
        }).then(res => res.json()).then(res =>{
            console.log(res);
            this.order_detail = res;
            // console.log(this.order_detail);
        }).catch(function(err){
            console.log('no data found');
        })
    },
})


