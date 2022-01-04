async function searchSth() {
    const input_search_product = document.querySelector("input.input_search_product");
    const food_search_content = document.querySelector("ul.food_search_content");
    const food_search_button = document.querySelector("div.food_search_button");
    const data = await fetch("./API/allProducts.php")
                        .then(res => res.json())
                        .then(data => data);
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
            for (let i = 0; i < data.length; i = i + 1) {
                if (data[i].PRODUCT_NAME.match(re)) {
                    matchData.push({
                        productName: data[i].PRODUCT_NAME.replace(re, `<span>${searchValue}</span>`),
                        img: data[i].PRODUCT_PICTURE1
                    });
                }
            }

            // 如果輸入的關鍵字有符合的資料的話輸入框以及下拉選單的class會改變
            if (matchData.length > 0) {
                food_search_content.classList.add("food_search_content_open");

                input_search_product.classList.add("input_search_product_open");

                food_search_button.classList.add("food_search_button_open");
            }

            // 將符合的值放入ul裡
            for (let i = 0; i < matchData.length; i = i + 1) {
                food_search_content.insertAdjacentHTML("beforeend", `
                    <li>
                        <a>
                            <p>${matchData[i].productName}</p>
                            <img src = ${matchData[i].img}>
                        </a>
                    </li>
                `);
            }
            
            // 將符合得值加入超連結
            for (let i = 0; i < matchData.length; i = i + 1) {
                food_search_content.children[i].addEventListener("click", function() {
                    for (let j = 0; j < data.length; j = j + 1) {
                        if (data[j].PRODUCT_PICTURE1.match(matchData[i].img) || data[j].PRODUCT_PICTURE2.match(matchData[i].img) || data[j].PRODUCT_PICTURE3.match(matchData[i].img) || data[j].PRODUCT_PICTURE4.match(matchData[i].img)) {
                            localStorage.setItem("productContent", JSON.stringify(data[j]));
                            location.href = "./inside.html";
                        }
                    }
                });
            }
        }
    });
}

searchSth();