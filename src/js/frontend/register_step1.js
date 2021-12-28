const register_step1_next_step_button = document.querySelector("button.register_step1_next_step_button");
const show_and_hide_icon = document.querySelector("#show_and_hide_icon");
const hide = show_and_hide_icon.children[1];
const show =show_and_hide_icon.children[2];




register_step1_next_step_button.addEventListener("click", function () {
    window.location.href = "/dist/register_step2.html";
});

show_and_hide_icon.addEventListener("click", function() {
    hide.classList.toggle("hide_close");
    show.classList.toggle("show_open");

    if(hide.classList.contains("hide_close")) {
        show_and_hide_icon.nextElementSibling.type = "text";
    }else {
        show_and_hide_icon.nextElementSibling.type = "password";
    }
});
