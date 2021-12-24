window.addEventListener("load", function() {
    const pageChoseOffsetTop = document.querySelector("ul.food_product_page_chose_container").offsetTop;
    const food_filter_container = this.document.querySelector("ul.food_filter_container");
    const food_filter_condition_item = document.querySelectorAll("li.food_filter_condition_item");

    function foodFilterContainerAnimate() {
        //判斷瀏覽器目前的高度是否到pageChoseOffsetTop
        window.addEventListener("scroll", function() {
            if(window.scrollY > pageChoseOffsetTop - 300) {
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




    foodFilterContainerAnimate();
    foodFilterConditionItemAnimate();
});