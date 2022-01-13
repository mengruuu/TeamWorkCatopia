
        // Vue.component("backendProduct", {
        // template: `
        //     <div class="backend_table">
        //         <table id="order_info">
        //             <tr class="table_title">
        //                 <td><a href="#"></a> 訂單編號</td>
        //                 <td>會員編號</td>
        //                 <td>會員信箱</td>
        //                 <td>下單時間</td>
        //                 <td>訂單狀態</td>
        //                 <td>付款方式</td>
        //                 <td>付款狀態</td>
        //                 <td>訂單金額</td>
        //                 <td>奴幣回饋</td>
        //                 <td>奴幣折抵</td>
        //             </tr>

        //             <tr class="table_title" v-for="(item, index) in backendOrder">
        //                 <td><a @click=backOrder(index) href="./b2_order_detail.html">{{item.ORDER_ID}}</a></td>
        //                 <td>{{item.MEMBER_ID}}</td>
        //                 <td>{{item.MEMBER_MAIL}}</td>
        //                 <td>{{item.ORDER_TIME}}</td>
        //                 <td>{{item.ORDER_MODE}}</td>
        //                 <td>{{item.PAYMENT_METHOD}}</td>
        //                 <td>{{item.PAYMENT_MODE}}</td>
        //                 <td>{{item.TOTAL_PRICE}}</td>
        //                 <td>{{item.COIN_GIVEBACK}}</td>
        //                 <td>{{item.COIN_DISCOUNT}}</td>
        //             </tr>
        //         </table>
        //     </div> 
        //     `,
        // data() {
        //     return {
        //     backendOrder: [],
        //     };
        // },
        // methods: {
        //     backOrder(index) {
        //     localStorage.setItem(
        //         "backendFindOrder",
        //         JSON.stringify(this.backendOrder[index])
        //     );
        //     },
        // },

        // mounted() {
        //     $.getJSON("./API/b2_back_get_order_info.php").then((res) => {
        //     // console.log(res);
        //     this.backendOrder = res;
        //     });
        // },
        // });
        // new Vue({
        //     el: "#backend_order_app",
        //     data: {},
        // });

 