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




// register_step1_next_step_button.addEventListener("click", function () {
//     window.location.href = "./register_step2.html";
// });

// show_and_hide_icon.addEventListener("click", function() {
//     hide.classList.toggle("hide_close");
//     show.classList.toggle("show_open");

//     if(hide.classList.contains("hide_close")) {
//         show_and_hide_icon.nextElementSibling.type = "text";
//     }else {
//         show_and_hide_icon.nextElementSibling.type = "password";
//     }
// });

function member_email_check(){
    $.ajax({
        method:'POST',
        url:'./API/register_step1.php',
        data:{
            email:$('#email').val(),
            password:$('#pwd').val(),
            name:$('#name').val(),
            phone:$('#phone').val(),
            address:$('#address').val()
        },
        dataType:'text',
        success:function(response){
            if(response){
                window.location.href = "./register_step2.html";
            }else{
                alert('此信箱已註冊過');
            }
        },error: function(exception) {
            alert("發生錯誤: " + exception.status);  //網路出錯的部分
        }
    });
}