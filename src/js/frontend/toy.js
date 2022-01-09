window.addEventListener("load", function () {
    const input_search_product = document.querySelector("input.input_search_product");
    const toy_search_content = document.querySelector("ul.toy_search_content");
    const toy_search_button = document.querySelector("div.toy_search_button");

    function toyFilterContainerAnimate() {
        //判斷瀏覽器目前的高度是否到pageChoseOffsetTop
        const toy_product_page_chose_container = document.querySelector("ul.toy_product_page_chose_container");
        const toy_filter_container = document.querySelector("ul.toy_filter_container");
        window.addEventListener("scroll", function () {
            if (window.scrollY > toy_product_page_chose_container.offsetTop - 380) {
                toy_filter_container.classList.add("toy_filter_container_hide");
            } else {
                if (toy_filter_container.classList.contains("toy_filter_container_hide")) {
                    toy_filter_container.classList.remove("toy_filter_container_hide");
                };
            }
        });
    }

    async function loadData() {
        const data = await fetch("./API/toy.php")
            .then(res => res.json())
            .then(data => data);
        let pages = Math.ceil(data.length / 8);
        let totalPage = [];

        // 將商品每8筆放入一個陣列裡並且推進totalPage同時將頁簽加上去
        for (let i = 1; i <= pages; i = i + 1) {
            totalPage.push(data.slice((i - 1) * 8, i * 8));
        }

        Vue.component('ToyFilterContainerAndToyProductOverview', {
            template: `
                <div class = "toy_filter_container_and_toy_product_overview">
                    <ul class = "toy_filter_container">
                        <li>
                            <p>{{ productData[0].PRODUCT_TYPE_NAME }}</p>
                        </li>
                        <li>
                            <p>玩具</p>
                            <hr>
                            <ul class = "toy_filter_condition_container">
                                <li :class = "{toy_filter_condition_item: true, toy_filter_condition_item_clicked: isSix}" @click = "clickedCondition('單貓')">單貓</li>
                                <li :class = "{toy_filter_condition_item: true, toy_filter_condition_item_clicked: isEighteen}" @click = "clickedCondition('人貓')">人貓</li>
                            </ul>
                        </li>
                    </ul>
                    <div class = "toy_product_overview">
                        <div class = "toy_product_overview_item" v-for = "(item, index) in productData">
                            <img class = "toy_product_overview_item_img" :src = item.PRODUCT_PICTURE1>
                            <div class = "toy_product_title_and_price_and_button">
                                <div class = "toy_product_title_and_price">
                                    <p>{{ item.PRODUCT_NAME }}</p>
                                    <p>{{ item.PRODUCT_PRICE }}</p>
                                </div>
                                <div class = "toy_product_content_button" @click = toProductContent(index) style = "background-image: url(./images/food/food_go_to_products_content_button.png)"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            props: {
                productData: {
                    type: Array
                },
                six: {
                    type: Boolean
                },
                eighteen: {
                    type: Boolean
                }
            },
            data() {
                return {
                    isSix: this.six,
                    isEighteen: this.eighteen,
                    countSix: 0,
                    countEighteen: 0
                }
            },
            methods: {
                toProductContent(index) {
                    localStorage.setItem("productContent", JSON.stringify(this.productData[index]));
                    location.href = `./inside.html?id=${this.productData[index].PRODUCT_ID}`;
                },
                clickedCondition(condition) {
                    //先reset
                    // this.isSix = false;
                    // this.isEighteen = false;

                    if (condition === '單貓') {
                        this.countSix = this.countSix + 1;

                        if (this.isSix) {
                            this.isSix = false;

                            this.isEighteen = false;
                        } else {
                            this.isSix = true;

                            this.isEighteen = false;
                        }
                    } else if (condition === '人貓') {
                        this.countEighteen = this.countEighteen + 1;

                        if (this.isEighteen) {
                            this.isEighteen = false;

                            this.isSix = false;
                        } else {
                            this.isEighteen = true;

                            this.isSix = false;
                        }
                    }
                    this.$emit('matchCondition', condition);
                }
            }
        });

        Vue.component('toyPage', {
            template: `
                <ul class = "toy_product_page_chose_container">
                    <li class = "toy_page_item" v-for = "(page, index) in pages" @click = "changePage(index)">{{ index+1 }}</li>
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
                    const container = document.querySelector("ul.toy_product_page_chose_container");

                    for (let i = 0; i < container.children.length; i = i + 1) {
                        if (container.children[i].classList.contains("toy_page_item_clicked")) {
                            container.children[i].classList.remove("toy_page_item_clicked");
                        }
                    };
                    container.children[index].classList.add("toy_page_item_clicked");
                    this.$emit("changepage", index);
                }
            }
        });

        const vm = new Vue({
            el: "#products_app",
            template: `
        <div>
            <toy-filter-container-and-toy-product-overview
                :productData = productData
                :six = isSix
                :eighteen = isEighteen
                @matchCondition = "clickedCondition"
            />
            <toy-page
                :pages = pages
                @changepage = changePage
            />
        </div>
    `,
            data() {
                return {
                    productData: totalPage[0],
                    pages: pages,
                    isSix: false,
                    isEighteen: false
                }
            },
            methods: {
                clickedCondition(condition) {
                    // 先reset
                    let matchData = [];

                    // this.isSix = false;

                    // this.isEighteen = false;

                    totalPage = [];

                    if (condition === "單貓" && this.isSix === true) {
                        this.pages = Math.ceil(data.length / 8);

                        for (let i = 1; i <= pages; i = i + 1) {
                            totalPage.push(data.slice((i - 1) * 8, i * 8));
                        };

                        this.isSix = false;

                        this.productData = totalPage[0]; 
                    } else if (condition === "人貓" && this.isEighteen === true) {
                        this.pages = Math.ceil(data.length / 8);

                        for (let i = 1; i <= pages; i = i + 1) {
                            totalPage.push(data.slice((i - 1) * 8, i * 8));
                        };

                        this.isEighteen = false;

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

                        if (condition === "單貓") {
                            this.isSix = true;
                            this.isEighteen = false;
                        } else {
                            this.isEighteen = true;
                            this.isSix = false;
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

        document.querySelector("ul.toy_product_page_chose_container").children[0].classList.add("toy_page_item_clicked");
        toyFilterContainerAnimate();
    }    
    loadData();
});