const bus = new Vue();
//first content
Vue.component('first-content',{
    template:`
    <div class="game_store_first_content">
        <choose-option></choose-option>
        
        <div class="first_content_cat">
            <div class="try_on">
                <p>試衣間</p>
            </div>
            <div class="cat">
                <img src="./images/game_store/devil_catman.png" alt="">
            </div>
            <div class="take_off">
                <button type="button" class="take_off_btn">
                    脫掉
                </button>
            </div>
        </div>
        <div class="first_content_text">
            <div class="product_text">
                <p>商品介紹</p>
            </div>
            <div class="text">
                <p>名稱:惡魔貓男</p>
                <p>描述:唉唷~懂選哦</p>
                <p>奴幣:300點</p>
            </div>
        </div>
    </div>
    `
})
Vue.component('choose-option',{
    methods: {
        changeType(e){
            console.log(e.target.innerHTML);
            let typeName = e.target.innerHTML.trim();
            // console.log(typeName);
            bus.$emit('getType',typeName);
        }
    },
    template:`
    <div class="first_content_option">
        <nav>
            <ul>
                <li><p>個性化商品</p></li>
                <li>
                    <div class="options" @click="changeType" id="heads">
                        <p>
                            頭套
                        </p>
                    </div>
                </li>
                <li>
                    <div class="options" @click="changeType" id="collar">
                        <p>
                            項圈
                        </p>
                    </div>
                </li>

                <li>
                    <div class="options" @click="changeType" id="clothes">
                        <p>
                            衣服
                        </p>
                    </div>
                </li>

                <li>
                    <div class="options" @click="changeType" id="wings">
                        <p>
                            翅膀
                        </p>
                    </div>
                </li>
                
            </ul>
        </nav>
    </div>
    `
})
//second content
Vue.component('second-content',{
    data() {
        return {
            type:'collar',
        }
    },
    mounted() {
        bus.$on('getType',function(typeName){
            console.log(typeName);
            this.type = typeName;
        })
    },
    template:`
    <div class="game_store_second_content">

        <product :is="type" v-bind:type="type"></product>
  

        <button type="button">
            加入購物車
        </button>
    </div>
    `,
    components:{
        heads:{
            props:['type'],
            data() {
                return {
                    pictures:[]
                }
            },
            template:`
            <div class="all_product">
                <div class="product" v-for="(picture,index) in pictures">
                    <img :src="pictures[index]['GAMESTORE_PRODUCT_PICTURE']">
                </div>
            </div>
            `,
            mounted() {
                fetch('./API/game_store_get_pictures.php',{
                    method: 'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(this.type),
                }).then(res => res.json()).then(res =>{
                    console.log(res);
                    this.pictures = res;
                }).catch(function(err){
                    console.log('no dataa found');
                })
            },
        },
        collar:{
            props:['type'],
            data() {
                return {
                    pictures:[]
                }
            },
            template:`
            <div class="all_product">
                <div class="product" v-for="(picture,index) in pictures">
                    <img :src="pictures[index]['GAMESTORE_PRODUCT_PICTURE']">
                </div>
            </div>
            `,
            mounted() {
                fetch('./API/game_store_get_pictures.php',{
                    method: 'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(this.type),
                }).then(res => res.json()).then(res =>{
                    console.log(res);
                    this.pictures = res;
                }).catch(function(err){
                    console.log('no dataa found');
                })
            },
        },
        clothes:{
            props:['type'],
            data() {
                return {
                    pictures:[]
                }
            },
            template:`
            <div class="all_product">
                <div class="product" v-for="(picture,index) in pictures">
                    <img :src="pictures[index]['GAMESTORE_PRODUCT_PICTURE']">
                </div>
            </div>
            `,
            mounted() {
                fetch('./API/game_store_get_pictures.php',{
                    method: 'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(this.type),
                }).then(res => res.json()).then(res =>{
                    console.log(res);
                    this.pictures = res;
                }).catch(function(err){
                    console.log('no dataa found');
                })
            },
        },
        wings:{
            props:['type'],
            data() {
                return {
                    pictures:[]
                }
            },
            template:`
            <div class="all_product">
                <div class="product" v-for="(picture,index) in pictures">
                    <img :src="pictures[index]['GAMESTORE_PRODUCT_PICTURE']">
                </div>
            </div>
            `,
            mounted() {
                fetch('./API/game_store_get_pictures.php',{
                    method: 'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body: JSON.stringify(this.type),
                }).then(res => res.json()).then(res =>{
                    console.log(res);
                    this.pictures = res;
                }).catch(function(err){
                    console.log('no dataa found');
                })
            },
        },
    }
})
// Vue.component('product',{
    
//     template:`
//     <div class="all_product">
//         <div class="product -on">
//             <img src="./images/game_store/product_cat1.png" >
//         </div>
//         <div class="product">
//             <img src="./images/game_store/product_cat2.png" >
//         </div>
//         <div class="product">
//             <img src="./images/game_store/product_cat3.png" >
//         </div>
//         <div class="product">
//             <img src="./images/game_store/product_cat4.png" >
//         </div>
//     </div>
//     `,
//     mounted() {
//         fetch('./API/game_store_get_pictures.php').then(res => res.json()).then(res =>{

//         }).catch(function(err){
//             console.log('no dataa found');
//         })
//     },
// })
//last content
Vue.component('last-content',{
    template:`
    <div class="game_store_last_content">
        <div class="shopping_chart">
            <img src="./images/game_store/shopping_chart.png" alt="">
            <p>選擇的商品</p>
        </div>

        <shopping-cart></shopping-cart>
    </div>
    `
})
Vue.component('shopping-cart',{
    template:`
    <div id="shopping_chart_product">
        <div class="chart_all_product">
            <div class="shopping_product">
                <img src="./images/game_store/product_cat1.png">
            </div>
            <div class="shopping_product">
                <img src="./images/game_store/product_bell.png">
            </div>
            <div class="shopping_product">
                <img src="./images/game_store/product_devil_wing.png">
            </div>
            <div class="shopping_product">
                <img src="./images/game_store/product_lion.png">
            </div>
        </div>
        <div class="pay">
            <div class="point">
                <p>您的點數共有:8000點</p>
                <p>商品所需點數:800點</p>
            </div>
            <button>
                使用點數兌換
            </button>
        </div>
    </div>
    `
})

let vm = new Vue({
    el:'#game_store',
    
})