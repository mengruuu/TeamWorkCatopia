window.addEventListener("load", function () {
    const food_product_page_chose_container = document.querySelector("ul.food_product_page_chose_container");
    const food_filter_container = document.querySelector("ul.food_filter_container");
    const food_filter_condition_item = document.querySelectorAll("li.food_filter_condition_item");
    const foodProducts = [];
    const food_product_overview = document.querySelector("div.food_product_overview");
    const input_search_product = document.querySelector("input.input_search_product");
    const food_search_content = document.querySelector("ul.food_search_content");
    const food_search_button = document.querySelector("div.food_search_button");
    let totalPage = [];

    function foodFilterContainerAnimate() {
        //判斷瀏覽器目前的高度是否到pageChoseOffsetTop
        window.addEventListener("scroll", function () {
            if (window.scrollY > food_product_page_chose_container.offsetTop - 380) {
                food_filter_container.classList.add("food_filter_container_hide");
            } else {
                if (food_filter_container.classList.contains("food_filter_container_hide")) {
                    food_filter_container.classList.remove("food_filter_container_hide");
                };
            }
        });
    }

    function foodFilterConditionItemAnimate() {
        for (let i = 0; i < food_filter_condition_item.length; i = i + 1) {
            food_filter_condition_item[i].addEventListener("click", function () {
                //先reset
                for (let j = 0; j < food_filter_condition_item.length; j = j + 1) {
                    if (food_filter_condition_item[j].classList.contains("food_filter_condition_item_clicked") && j !== i) {
                        food_filter_condition_item[j].classList.remove("food_filter_condition_item_clicked");
                    }
                }

                food_filter_condition_item[i].classList.toggle("food_filter_condition_item_clicked");
            });
        }
    }

    function foodProductsLoad() {
        // 模擬有50比商品資料
        for (let i = 0; i < 50; i = i + 1) {
            foodProducts.push({
                productName: `商品${i+1}`,
                price: 300,
                img: "./images/food/food_overview_RAINCOAST_1.png"
            });
        }
        // ----------------------------------------------------------串接資料後要修改掉~

        // 總共有幾頁
        let pages = Math.ceil(foodProducts.length / 8);

        // 將商品每8筆放入一個陣列裡並且推進totalPage同時將頁簽加上去
        for (let i = 1; i <= pages; i = i + 1) {
            totalPage.push(foodProducts.slice((i - 1) * 8, i * 8));
            food_product_page_chose_container.insertAdjacentHTML("beforeend", `<li class = "food_page_item" data-page = ${i}>${i}</li>`);
        }

        // 重整或剛載入網頁的時候會看到第一頁
        for(let i = 0; i < totalPage[0].length; i = i + 1) {
            food_product_overview.insertAdjacentHTML("beforeend", `
                <div class = "food_product_overview_item">
                    <img class = "food_product_overview_item_img" src = ${totalPage[0][i].img}>
                    <div class = "food_product_title_and_price_and_button">
                        <div class = "food_product_title_and_price">
                            <p>${totalPage[0][i].productName}</p>
                            <p>$${totalPage[0][i].price}</p>
                        </div>
                        <div class = "food_product_content_button" style = "background-image: url(./images/food/food_go_to_products_content_button.png);"></div>
                    </div>
                </div>
            `);
        }

        // 先reset頁簽的class並且將第一頁的頁簽加上class
        for (let i = 0; i < food_product_page_chose_container.children.length; i = i + 1) {
            if(food_product_page_chose_container.children[i].classList.contains("food_page_item_clicked")) {
                food_product_page_chose_container.children[i].classList.remove("food_page_item_clicked");
            }
        }

        food_product_page_chose_container.children[0].classList.add("food_page_item_clicked");


        // 點擊頁簽來更新資料
        for (let i = 0; i < food_product_page_chose_container.children.length; i = i + 1) {
            food_product_page_chose_container.children[i].addEventListener("click", function() {
                const page = this.getAttribute("data-page");




                // 先reset要顯示的內容以及class
                food_product_overview.innerHTML = "";

                for (let i = 0; i < food_product_page_chose_container.children.length; i = i + 1) {
                    if(food_product_page_chose_container.children[i].classList.contains("food_page_item_clicked")) {
                        food_product_page_chose_container.children[i].classList.remove("food_page_item_clicked");
                    }
                }

                // 將點選到的頁數內容載入到html裡以及更改頁簽的class
                for(let i = 0; i < totalPage[page - 1].length; i = i + 1) {
                    food_product_overview.insertAdjacentHTML("beforeend", `
                        <div class = "food_product_overview_item">
                            <img class = "food_product_overview_item_img" src = ${totalPage[page - 1][i].img}>
                            <div class = "food_product_title_and_price_and_button">
                                <div class = "food_product_title_and_price">
                                    <p>${totalPage[page - 1][i].productName}</p>
                                    <p>$${totalPage[page - 1][i].price}</p>
                                </div>
                                <div class = "food_product_content_button" style = "background-image: url(./images/food/food_go_to_products_content_button.png);"></div>
                            </div>
                        </div>
                    `);
                }
                this.classList.add("food_page_item_clicked");

                // 最後將畫面移動到最上方
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                  });
            });
        }
    };

    function searchSth() {
        input_search_product.addEventListener("input", function () {
            const matchData = [];
            const searchValue = input_search_product.value;
            const re = new RegExp(searchValue, `gi`);




            //先reset
            food_search_content.innerHTML = "";

            if (food_search_content.classList.contains("food_search_content_open")) {
                food_search_content.classList.remove("food_search_content_open");
            }

            if (input_search_product.classList.contains("input_search_product_open")) {
                input_search_product.classList.remove("input_search_product_open");
            }

            if (food_search_button.classList.contains("food_search_button_open")) {
                food_search_button.classList.remove("food_search_button_open");
            }

            //沒有輸入值的時候也清空
            if (!searchValue) {
                food_search_content.innerHTML = "";

                if (food_search_content.classList.contains("food_search_content_open")) {
                    food_search_content.classList.remove("food_search_content_open");
                }

                if (input_search_product.classList.contains("input_search_product_open")) {
                    input_search_product.classList.remove("input_search_product_open");
                }

                if (food_search_button.classList.contains("food_search_button_open")) {
                    food_search_button.classList.remove("food_search_button_open");
                }

            } else {
                for (let i = 0; i < foodProducts.length; i = i + 1) {
                    if (foodProducts[i].productName.match(re)) {
                        matchData.push({
                            productName: foodProducts[i].productName.replace(re, `<span>${searchValue}</span>`),
                            img: foodProducts[i].img
                        });
                    }
                }

                // 如果輸入的關鍵字有符合的資料的話輸入框以及下拉選單的class會改變
                if (matchData.length > 0) {
                    food_search_content.classList.add("food_search_content_open");

                    input_search_product.classList.add("input_search_product_open");

                    food_search_button.classList.add("food_search_button_open");
                }

                // 將符合的直放入ul裡
                for (let i = 0; i < matchData.length; i = i + 1) {
                    food_search_content.insertAdjacentHTML("beforeend", `
                        <li>
                            <a href = "#">
                                <p>${matchData[i].productName}</p>
                                <img src = ${matchData[i].img}>
                            </a>
                        </li>
                    `);
                }
            }
        });
    }




    foodFilterContainerAnimate();
    foodFilterConditionItemAnimate();
    foodProductsLoad();
    searchSth();
});