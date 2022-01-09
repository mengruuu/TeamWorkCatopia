// 用component渲染
Vue.component('backendProduct', {
    template: `
    
    <div class="backend_table">
        <table>
            <tr class="table_title">
                <td>商品編號</td>
                <td>商品名稱</td>
                <td>商品分類</td>
                <td>商品篩選</td>
                <td>商品單價</td>
                <td>編輯/備註</td>
            </tr>
    
            <tr v-for="item in productData">
                <td>{{item.PRODUCT_ID}}</td>
                <td>{{item.PRODUCT_NAME}}</td>
                <td>{{item.PRODUCT_TYPE_NAME}}</td>
                <td>{{item.PRODUCT_FEATURE}}</td>
                <td>{{item.PRODUCT_PRICE}}</td>
                <td><a href="./b3_product_edit.html"><img src="../images/backend/edit.png"></a></td>
            </tr>
        </table>
    </div>

    `,
    data(){
        return{
            productData: [],
                // {
                //     productId: 1,
                //     productName: "軟軟萌萌主子睡枕",
                //     productType: "生活用品",
                //     productFeature: "N",
                //     productPrice: "500",
                // },
                // {
                //     productId: 1,
                //     productName: "軟軟萌萌主子睡枕",
                //     productType: "生活用品",
                //     productFeature: "N",
                //     productPrice: "500",
                // },
                // {
                //     productId: 1,
                //     productName: "軟軟萌萌主子睡枕",
                //     productType: "生活用品",
                //     productFeature: "N",
                //     productPrice: "500",
                // },
                // {
                //     productId: 1,
                //     productName: "軟軟萌萌主子睡枕",
                //     productType: "生活用品",
                //     productFeature: "N",
                //     productPrice: "500",
                // }
            
        }
    },
    
    mounted() {
        $.getJSON('./API/b3_product.php').then((res) => {
                // console.log(res);
                this.productData = res;
            });
        },
    })


new Vue({
    el: '#backend_product_app',
    data: {
        
    }
})