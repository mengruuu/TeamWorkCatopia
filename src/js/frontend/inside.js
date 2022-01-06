function doQuery() {
  let big_img = document.getElementsByClassName("big_img")[0];
  let small_img = document.getElementsByClassName("small_img");
  small_img[0].style =
    "transform: scale(1.1);border:2px solid #774F40;border-radius: 5px;";

  for (let i = 0; i < small_img.length; i++) {
    small_img[i].addEventListener("click", function () {
      big_img.src = small_img[i].src;
      for (let i = 0; i < small_img.length; i++) {
        small_img[i].style = "";
      }
      this.style = "transform: scale(1.1);border:2px solid #774F40;border-radius: 5px;";
    });
  }
}
document.addEventListener("load", doQuery());
