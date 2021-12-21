//輪播套件
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
});
var popupBtn = document.getElementsByClassName("background_pop")[0];
var close = document.getElementById("close_btn");
let back = document.querySelector(".background");
function show() {
  popupBtn.style.display = "block";
  back.classList.toggle("on");
}
close.onclick = function close() {
  popupBtn.style.display = "none";
  back.classList.toggle("on");
};
window.addEventListener(
  "click",
  function (e) {
    if (back.classList.contains("on") && e.target == back) {
      popupBtn.style.display = "none";
      back.classList.toggle("on");
    }
  },
  true
);
