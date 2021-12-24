window.addEventListener("load", function() {
    const pageChoseOffsetTop = document.querySelector("ul.food_product_page_chose_container").offsetTop;
    const food_filter_container = this.document.querySelector("ul.food_filter_container");
    const food_filter_condition_item = document.querySelectorAll("li.food_filter_condition_item");
    const foodProducts = [{productName: "商品一", price: 300, img: "./images/food/food_overview_RAINCOAST_1.png"}, {productName: "商品二", price: 300, img: "./images/food/food_overview_RAINCOAST_1.png"}, {productName: "商品三", price: 300, img: "./images/food/food_overview_RAINCOAST_1.png"}];
    const food_product_overview = document.querySelector("div.food_product_overview");
    const input_search_product = document.querySelector("input.input_search_product");
    const food_search_content = document.querySelector("ul.food_search_content");
    const food_search_button = document.querySelector("div.food_search_button");

    function foodFilterContainerAnimate() {
        //判斷瀏覽器目前的高度是否到pageChoseOffsetTop
        window.addEventListener("scroll", function() {console.log(window.scrollY, ",", pageChoseOffsetTop);
            if(window.scrollY > pageChoseOffsetTop + 90) {
                food_filter_container.classList.add("food_filter_container_hide");
            }else {
                if(food_filter_container.classList.contains("food_filter_container_hide")) {
                    food_filter_container.classList.remove("food_filter_container_hide");
                };
            }
        });
    }

    function foodFilterConditionItemAnimate() {
        for(let i = 0; i < food_filter_condition_item.length; i = i + 1) {
            food_filter_condition_item[i].addEventListener("click", function() {
                //先reset
                for(let j = 0; j < food_filter_condition_item.length; j = j + 1) {
                    if(food_filter_condition_item[j].classList.contains("food_filter_condition_item_clicked") && j !== i) {
                        food_filter_condition_item[j].classList.remove("food_filter_condition_item_clicked");
                    }
                }

                food_filter_condition_item[i].classList.toggle("food_filter_condition_item_clicked");
            });
        }
    }

    function foodProductsLoad() {
        for(let i = 0; i < foodProducts.length; i = i + 1) {
            food_product_overview.insertAdjacentHTML("beforeend", `
                <div class = "food_product_overview_item">
                    <img class = "food_product_overview_item_img" src = ${foodProducts[i].img}>
                    <div class = "food_product_title_and_price_and_button">
                        <div class = "food_product_title_and_price">
                            <p>${foodProducts[i].productName}</p>
                            <p>$${foodProducts[i].price}</p>
                        </div>
                        <div class = "food_product_content_button" style = "background-image: url(./images/food/food_go_to_products_content_button.png);"></div>
                    </div>
                </div>
            `);
        }
    }

    function searchSth() {
        input_search_product.addEventListener("input", function() {
            const matchData = [];
            const searchValue = input_search_product.value;
            const re = new RegExp(searchValue,`gi`);




            //先reset
            food_search_content.innerHTML = "";

            if(food_search_content.classList.contains("food_search_content_open")) {
                food_search_content.classList.remove("food_search_content_open");
            }

            if(input_search_product.classList.contains("input_search_product_open")) {
                input_search_product.classList.remove("input_search_product_open");
            }

            if(food_search_button.classList.contains("food_search_button_open")) {
                food_search_button.classList.remove("food_search_button_open");
            }

            //沒有輸入值的時候也清空
            if(!searchValue) {
                food_search_content.innerHTML = "";

                if(food_search_content.classList.contains("food_search_content_open")) {
                    food_search_content.classList.remove("food_search_content_open");
                }

                if(input_search_product.classList.contains("input_search_product_open")) {
                    input_search_product.classList.remove("input_search_product_open");
                }

                if(food_search_button.classList.contains("food_search_button_open")) {
                    food_search_button.classList.remove("food_search_button_open");
                }

            }else {
                for(let i = 0; i < foodProducts.length; i = i + 1) {
                    if(foodProducts[i].productName.match(re)) {
                        matchData.push({productName: foodProducts[i].productName.replace(re, `<span>${searchValue}</span>`), img: foodProducts[i].img});
                    }
                }

                // 如果輸入的關鍵字有符合的資料的話輸入框以及下拉選單的class會改變
                if(matchData.length > 0) {
                    food_search_content.classList.add("food_search_content_open");

                    input_search_product.classList.add("input_search_product_open");

                    food_search_button.classList.add("food_search_button_open");
                }

                // 將符合的直放入ul裡
                for(let i = 0; i < matchData.length; i = i + 1) {
                    food_search_content.insertAdjacentHTML("beforeend",`
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