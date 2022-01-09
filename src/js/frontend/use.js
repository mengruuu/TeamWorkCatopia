window.addEventListener("load", function () {
    const input_search_product = document.querySelector("input.input_search_product");
    const use_search_content = document.querySelector("ul.use_search_content");
    const use_search_button = document.querySelector("div.use_search_button");

    function useFilterContainerAnimate() {
        //判斷瀏覽器目前的高度是否到pageChoseOffsetTop
        const use_product_page_chose_container = document.querySelector("ul.use_product_page_chose_container");
        const use_filter_container = document.querySelector("ul.use_filter_container");
        window.addEventListener("scroll", function () {
            if (window.scrollY > use_product_page_chose_container.offsetTop - 380) {
                use_filter_container.classList.add("use_filter_container_hide");
            } else {
                if (use_filter_container.classList.contains("use_filter_container_hide")) {
                    use_filter_container.classList.remove("use_filter_container_hide");
                };
            }
        });
    }

    async function loadData() {
        const data = await fetch("./API/use.php")
            .then(res => res.json())
            .then(data => data);
        let pages = Math.ceil(data.length / 8);
        let totalPage = [];

        // 將商品每8筆放入一個陣列裡並且推進totalPage同時將頁簽加上去
        for (let i = 1; i <= pages; i = i + 1) {
            totalPage.push(data.slice((i - 1) * 8, i * 8));
        }

        Vue.component('use-filter-container-and-use-product-overview', {
            template: `
                <div class = "use_filter_container_and_use_product_overview">
                    <ul class = "use_filter_container">
                        <li>
                            <p>{{ productData[0].PRODUCT_TYPE_NAME }}</p>
                        </li>
                        <li>
                            <p>用品</p>
                            <hr>
                            <ul class = "use_filter_condition_container">
                                <li :class = "{use_filter_condition_item: true, use_filter_condition_item_clicked: outsidebag}" @click = "clickedCondition('外出包包')">外出包包</li>
                                <li :class = "{use_filter_condition_item: true, use_filter_condition_item_clicked: catnest}" @click = "clickedCondition('小窩')">小窩</li>
                                <li :class = "{use_filter_condition_item: true, use_filter_condition_item_clicked: scratcher}" @click = "clickedCondition('抓板')">抓板</li>
                                <li :class = "{use_filter_condition_item: true, use_filter_condition_item_clicked: bowl}" @click = "clickedCondition('食器')">食器</li>
                                <li :class = "{use_filter_condition_item: true, use_filter_condition_item_clicked: toilet}" @click = "clickedCondition('貓砂盆')">貓砂盆</li>
                                <li :class = "{use_filter_condition_item: true, use_filter_condition_item_clicked: strap}" @click = "clickedCondition('胸背帶')">胸背帶</li>
                            </ul>
                        </li>
                    </ul>
                    <div class = "use_product_overview">
                        <div class = "use_product_overview_item" v-for = "(item, index) in productData">
                            <img class = "use_product_overview_item_img" :src = item.PRODUCT_PICTURE1>
                            <div class = "use_product_title_and_price_and_button">
                                <div class = "use_product_title_and_price">
                                    <p>{{ item.PRODUCT_NAME }}</p>
                                    <p>{{ item.PRODUCT_PRICE }}</p>
                                </div>
                                <div class = "use_product_content_button" @click = toProductContent(index) style = "background-image: url(./images/food/food_go_to_products_content_button.png)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            props: {
                productData: {
                    type: Array
                },
                outsidebag: {
                    type: Boolean
                },
                catnest: {
                    type: Boolean
                },
                scratcher: {
                    type: Boolean
                },
                bowl: {
                    type: Boolean
                },
                toilet: {
                    type: Boolean
                },
                strap: {
                    type: Boolean
                }
            },
           data() {
               return{
                thisoutsidebag: this.outsidebag,
                thiscatnest: this.catnest,
                thisscratcher: this.scratcher,
                thisbowl: this.bowl,
                thistoilet: this.toilet,
                thisstrap: this.strap
               }
           },
            methods: {
                toProductContent(index) {
                    localStorage.setItem("productContent", JSON.stringify(this.productData[index]));
                    location.href = `./inside.html?id=${this.productData[index].PRODUCT_ID}`;
                },
                clickedCondition(condition) {
                    //先reset
                    // this.outsidebag = false;
                    // this.thiscatnest = false;

                    if (condition === '外出包包') {

                        if (this.thisoutsidebag) {
                            this.thiscatnest = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        } else {
                            this.thisoutsidebag = true;
                            this.catnest = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        }
                    } else if (condition === '小窩') {
                        if (this.thiscatnest) {
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        } else {
                            this.thiscatnest = true;
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        }
                    } else if (condition === '抓板'){
                        if (this.thiscatnest) {
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        } else {
                            this.thiscatnest = false;
                            this.thisoutsidebag = false;
                            this.thiscatnest = true;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        }
                    } else if (condition === '食器'){
                        if (this.thisbowl) {
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        } else {
                            this.thiscatnest = false;
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thisbowl = true;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        }
                    } else if (condition === '貓砂盆'){
                        if (this.thistoilet) {
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        } else {
                            this.thiscatnest = false;
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = true;
                            this.thisstrap = false;
                        }
                    } else if (condition === '胸背帶'){
                        if (this.thisstrap) {
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = false;
                        } else {
                            this.thiscatnest = false;
                            this.thisoutsidebag = false;
                            this.thiscatnest = false;
                            this.thisbowl = false;
                            this.thistoilet = false;
                            this.thisstrap = true;
                        }
                    }
                    this.$emit('matchCondition', condition);
                }
            }
        });

        Vue.component('usePage', {
            template: `
                <ul class = "use_product_page_chose_container">
                    <li class = "use_page_item" v-for = "(page, index) in pages" @click = "changePage(index)">{{ index+1 }}</li>
                </ul>
            `,
            props: {
                pages: {
                    type: Number
                }
            },
            data() {
                return {
                    isClicked: false
                }
            },
            methods: {
                changePage(index) {
                    const container = document.querySelector("ul.use_product_page_chose_container");

                    for (let i = 0; i < container.children.length; i = i + 1) {
                        if (container.children[i].classList.contains("use_page_item_clicked")) {
                            container.children[i].classList.remove("use_page_item_clicked");
                        }
                    };
                    container.children[index].classList.add("use_page_item_clicked");
                    this.$emit("changepage", index);
                }
            }
        });

        const vm = new Vue({
            el: "#products_app",
            template: `
        <div>
            <use-filter-container-and-use-product-overview
                :productData = productData
                :outsidebag = outsidebag
                :catnest = catnest
                :scratcher = scratcher
                :bowl = bowl
                :toilet = toilet
                :strap = strap
                @matchCondition = "clickedCondition"
            />
            <use-page
                :pages = pages
                @changepage = changePage
            />
        </div>
    `,
            data() {
                return {
                    productData: totalPage[0],
                    pages: pages,
                    outsidebag: false,
                    catnest: false,
                    scratcher: false,
                    bowl: false,
                    toilet: false,
                    strap: false
                }
            },
            methods: {
                clickedCondition(condition) {
                    // 先reset
                    let matchData = [];

                    // this.outsidebag = false;

                    // this.catnest = false;

                    totalPage = [];

                    if (condition === "外出包包" && this.outsidebag === true) {
                        this.pages = Math.ceil(data.length / 8);

                        for (let i = 1; i <= pages; i = i + 1) {
                            totalPage.push(data.slice((i - 1) * 8, i * 8));
                        };

                        this.outsidebag = false;

                        this.productData = totalPage[0]; 
                    } else if (condition === "小窩" && this.catnest === true) {
                        this.pages = Math.ceil(data.length / 8);

                        for (let i = 1; i <= pages; i = i + 1) {
                            totalPage.push(data.slice((i - 1) * 8, i * 8));
                        };

                        this.catnest = false;

                        this.productData = totalPage[0];
                    } else if (condition === "抓板" && this.scratcher === true){
                        this.pages = Math.ceil(data.length / 8);

                        for (let i = 1; i <= pages; i = i + 1) {
                            totalPage.push(data.slice((i - 1) * 8, i * 8));
                        };

                        this.scratcher = false;

                        this.productData = totalPage[0];
                    } else {
                        for (let i = 0; i < data.length; i = i + 1) {
                            if (data[i].PRODUCT_FEATURE === condition) {
                                matchData.push(data[i]);
                            }
                        }

                        this.pages = Math.ceil(matchData.length / 8);

                        for (let i = 1; i <= pages; i = i + 1) {
                            totalPage.push(matchData.slice((i - 1) * 8, i * 8));
                        }

                        if (condition === "外出包包") {
                            this.outsidebag = true;
                            this.catnest = false;
                            this.scratcher = false;
                            this.toilet = false;
                            this.bowl = false;
                            this.strap = false;
                        } else if (condition === "小窩") {
                            this.catnest = true;
                            this.outsidebag = false;
                            this.scratcher = false;
                            this.toilet = false;
                            this.bowl = false;
                            this.strap = false;
                        } else if (condition === "抓板"){
                            this.catnest = false;
                            this.outsidebag = false;
                            this.scratcher = true;
                            this.toilet = false;
                            this.bowl = false;
                            this.strap = false;
                        } else if (condition === "食器"){
                            this.catnest = false;
                            this.outsidebag = false;
                            this.scratcher = false;
                            this.toilet = false;
                            this.bowl = true;
                            this.strap = false;
                        } else if (condition === "貓砂盆"){
                            this.catnest = false;
                            this.outsidebag = false;
                            this.scratcher = false;
                            this.toilet = true;
                            this.bowl = false;
                            this.strap = false;
                        } else if (condition === "胸背帶"){
                            this.catnest = false;
                            this.outsidebag = false;
                            this.scratcher = false;
                            this.toilet = false;
                            this.bowl = false;
                            this.strap = true;
                        }
                        this.productData = totalPage[0];
                    }
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                },
                changePage(page) {
                    this.productData = totalPage[page];
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });

        document.querySelector("ul.use_product_page_chose_container").children[0].classList.add("use_page_item_clicked");
        useFilterContainerAnimate();
    }    
    loadData();
});