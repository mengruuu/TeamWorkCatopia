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
    template:`
        <div class="cart_step1_buy_item1">
            <div class="cart_step1_item">
                <img src="https://via.placeholder.com/185x185">
                <p>這是商品名稱</p>
            </div>
            <div class="cart_step1_type">
                <p>Type1</p>
            </div>
            <div class="cart_step1_number">
                <p>
                    <input type="number" value="1">
                </p>
            </div>
            <div class="cart_step1_price">
                <p>300　元</p>
            </div>
        </div>
    `
});

Vue.component('cart-total',{
    template:`
    <div class="cart_step1_total_price">
            <div class="cart_step1_item_total_price">
                <p>商品總額</p>
                <p>600　元</p>
            </div>
            <div class="cart_step1_fee">
                <p>運費</p>
                <p>0　元</p>
            </div>
        </div>

        <div class="cart_step1_total_price">
            <div class="cart_step1_point">
                <p>您的點數</p>
                <p>500　點</p>
            </div>
            <div class="cart_step1_point">
                <p>點數折抵</p>
                <p><input type="text" value="0">　點</p>
            </div>
        </div>

        <div class="cart_step1_total_price">
            <div class="cart_step1_order_price">
                <p>訂單總額</p>
                <p>600　元</p>
            </div>
        </div>
    `
});

let vm = new Vue({
    el:'#cart_app',
    data:{
        test:0,
        ti:20,
    },
});