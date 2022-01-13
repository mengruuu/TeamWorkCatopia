
        let value = JSON.parse(localStorage.getItem("backendFindOrder"));

        Vue.component("backendProduct", {
            template: `  
                <table>
                    <tr class="table_title">
                        <td>購買清單</td>
                        <td>數量</td>
                        <td>價格</td>
                        <td>配送方式</td>
                        <td>配送地址</td>
                        <td>收件人</td>
                        <td>收件人電話</td>
                    </tr>
                    <tr v-for="(item, index) in backendOrderDetail">
                        <td>{{item.PRODUCT_NAME}}</td>
                        <td>{{item.PRODUCT_QUANTITY}}</td>
                        <td>{{Number(item.PRODUCT_QUANTITY) * Number(item.PRODUCT_PRICE)}}</td>
                        <td>{{item.SHIPPING_METHOD}}</td>
                        <td>{{item.SHIPPING_ADDRESS}}</td>
                        <td>{{item.RECIPIENT_NAME}}</td>
                        <td>{{item.RECIPIENT_PHONE}}</td>
                    </tr>
                </table>
            `,
            data() {
                return {
                    // backendOrderDetail: [],
                };
            },
            props: {
                backendOrderDetail: {
                    type: Array
                }
            }
        //     mounted() {
        //         $.ajax({
        //                 method: "POST",
        //                 url: "./API/b2_back_order_detail.php",
        //                 data: {
        //                     order_id :  value.ORDER_ID,
        //                 },
        //                 dataType: "json",
        //                 success: function (response) {
        //                     console.log(response);
        //                     this.backendOrderDetail = response;
        //                     console.log(this.backendOrderDetail);
        //                     console.log('回傳成功');
        //                 },
        //                 error: function (exception) {
        //                     alert("發生錯誤: " + exception.status);
        //                 },
        //             });

        // },
            
        })

        const vm = new Vue({
            el: "#order_detail_app",
            data() {
                return {
                    member_id: value.MEMBER_ID,
                    MEMBER_MAIL: value.MEMBER_MAIL,
                    ORDER_TIME: value.ORDER_TIME,
                    ORDER_MODE: value.ORDER_MODE,
                    PAYMENT_METHOD: value.PAYMENT_METHOD,
                    PAYMENT_MODE: value.PAYMENT_MODE,
                    TOTAL_PRICE: value.TOTAL_PRICE,
                    COIN_GIVEBACK: value.COIN_GIVEBACK,
                    COIN_DISCOUNT: value.COIN_DISCOUNT,
                    backendOrderDetail: []
                };
            },
            template: `
            <div>
                <table>
                    <tr class="table_title">
                        <td>會員編號</td>
                        <td>會員信箱</td>
                        <td>下單時間</td>
                        <td>訂單狀態</td>
                        <td>付款方式</td>
                        <td>付款狀態</td>
                        <td>訂單金額</td>
                        <td>奴幣回饋</td>
                        <td>奴幣折抵</td>
                    </tr>
                    <tr>
                        <td>{{member_id}}</td>
                        <td>{{MEMBER_MAIL}}</td>
                        <td>{{ORDER_TIME}}</td>
                        <td>{{ORDER_MODE}}</td>
                        <td>{{PAYMENT_METHOD}}</td>
                        <td>{{PAYMENT_MODE}}</td>
                        <td>{{TOTAL_PRICE}}</td>
                        <td>{{COIN_GIVEBACK}}</td>
                        <td>{{COIN_DISCOUNT}}</td>
                    </tr>
                </table>
                <hr/>
                <backend-product
                    :backendOrderDetail = "backendOrderDetail"
                ></backend-product>
            </div>
            `,
            mounted() {
                $.ajax({
                        method: "POST",
                        url: "./API/b2_back_order_detail.php",
                        data: {
                            order_id :  value.ORDER_ID,
                        },
                        dataType: "json",
                        success: function (response) {
                            // console.log(response);
                            vm.backendOrderDetail = response;
                            // console.log(vm.backendOrderDetail);
                            // console.log('回傳成功');
                        },
                        error: function (exception) {
                            alert("發生錯誤: " + exception.status);
                        },
                    });

            },
        });
