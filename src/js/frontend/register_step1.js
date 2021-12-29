const register_step1_next_step_button = document.querySelector("button.register_step1_next_step_button");
// const show_and_hide_icon = document.querySelector("#show_and_hide_icon");
// const hide = show_and_hide_icon.children[1];
// const show =show_and_hide_icon.children[2];
const vm = new Vue({
    el: "#register_step1_app",
    template: `
        <div>
            <div id = "show_and_hide_icon" @click = "changeHideAndShow">
                <label>重新輸入密碼</label>
                <i :class="{far: true, 'fa-eye-slash': true, hide_close: isShow}"></i>
                <i :class="{far: true, 'fa-eye': true, register_first_icon_hide: true, show_open: isShow}"></i>
            </div>
            <input :type = "inputType">
        </div>
    `,
    data() {
        return {
            isShow: false,
            inputType: "password"
        }
    },
    methods: {
        changeHideAndShow() {
            if(this.isShow === false) {
                this.isShow = true;
                if(this.inputType === "password") {
                    this.inputType = "text";
                }
            }else {
                this.isShow = false;
                if(this.inputType === "text") {
                    this.inputType = "password";
                }
            }
        },
    },
});




register_step1_next_step_button.addEventListener("click", function () {
    window.location.href = "/dist/register_step2.html";
});

// show_and_hide_icon.addEventListener("click", function() {
//     hide.classList.toggle("hide_close");
//     show.classList.toggle("show_open");

//     if(hide.classList.contains("hide_close")) {
//         show_and_hide_icon.nextElementSibling.type = "text";
//     }else {
//         show_and_hide_icon.nextElementSibling.type = "password";
//     }
// });
