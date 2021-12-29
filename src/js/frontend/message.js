const message_write_message_img_file_container = document.querySelector("label.message_write_message_img_file_container");
const message_write_img_container = document.querySelector("div.message_write_img_container");
const click_to_message_input_container = document.querySelector("input.click_to_message_input_container");
const message_write_message_container = document.querySelector("div.message_write_message_container");
const message_write_message_close = document.querySelector("div.message_write_message_close");
const message_write_background = document.querySelector("div.message_write_background");
const inputFile = document.querySelector("input[type = 'file");
const message_write_img_container_content = document.querySelector("div.message_write_img_container_content");

function upLoadImg(srcEl, distEl) {
    srcEl.addEventListener("change", function () {
        const file = document.querySelector("input[type = 'file").files[0];
        const readFile = new FileReader();




        distEl.classList.add("message_write_img_container_overflowY");
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
            if (distEl.children[0].children[1]) {
                distEl.children[0].children[1].remove();
            }
            distEl.children[0].insertAdjacentHTML("beforeend", `
                            <img class = "message_write_img_content" src = ${readFile.result}>
                        `);
        });
    });
};

function dragOverImg(message_write_message_content_container, el, newClass) {
    el.addEventListener("dragover", function (event) {
        event.preventDefault();
        el.classList.add(newClass);
    });

    // 拖曳檔案到內容區的時候，圖片上傳區就會顯示出來
    message_write_message_content_container.addEventListener("dragover", function (event) {
        event.preventDefault();
        message_write_img_container.classList.add("message_write_img_container_open");
    });

}

function droppedImg(srcEl, message_write_img_container) {
    // 拖曳檔案到圖片上傳區的時候，圖片就能上傳
    srcEl.addEventListener("drop", function (event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const readFile = new FileReader();




        message_write_img_container.classList.add("message_write_img_container_overflowY");
        readFile.readAsDataURL(file);
        readFile.addEventListener("load", function () {
            if (srcEl.children[1]) {
                srcEl.children[1].remove();
            }
            srcEl.insertAdjacentHTML("beforeend", `
                            <img class = "message_write_img_content" src = ${readFile.result}>
                        `);
        });
    });
}




// 上傳圖片
upLoadImg(inputFile, message_write_img_container);
dragOverImg(message_write_img_container.parentElement, message_write_img_container.children[0], "message_write_img_container_open");
droppedImg(message_write_img_container.children[0], message_write_img_container);

// 點擊上傳圖片按鈕後，顯示圖片上傳區
message_write_message_img_file_container.addEventListener("click", function () {
    message_write_img_container.classList.add("message_write_img_container_open");
});

// 點擊發一則貼文後的效果
click_to_message_input_container.addEventListener("click", function () {
    message_write_message_container.classList.add("message_write_message_container_open");
    message_write_background.style.display = "block";
});

// 點擊貼文關閉按鈕後的效果
message_write_message_close.addEventListener("click", function () {
    message_write_message_container.classList.remove("message_write_message_container_open");
    message_write_background.style.display = "none";
});

// 點擊外面其他元素來關閉發文區
document.querySelector("body").addEventListener("click", function (event) {
    if (message_write_message_container.classList.contains("message_write_message_container_open") && event.target === message_write_background) {
        message_write_message_container.classList.remove("message_write_message_container_open");
        message_write_background.style.display = "none";
    }
}, true);

// 點擊圖片右上方的X會做的事情
message_write_img_container.children[0].addEventListener("click", function () {
    if (!(message_write_img_container.children[0].children[1])) {
        window.alert("目前沒有選擇圖片！");
    } else {
        if (window.confirm("確定要刪除圖片？")) {
            message_write_img_container.classList.remove("message_write_img_container_open");
            message_write_img_container.children[0].children[1].remove();
        } else {
            return;
        }
    }
});