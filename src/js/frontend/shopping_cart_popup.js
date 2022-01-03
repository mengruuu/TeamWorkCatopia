var hd_popupBtn = document.getElementById('hd_background_pop');
var hd_popupClick = document.getElementById('hd_popup_click');
var hd_close = document.getElementById('hd_close_btn');
hd_popupClick.addEventListener('click', function(){
    hd_popupBtn.style.display = "block";
    // console.log('test');
})
hd_close.onclick = function close() {
    hd_popupBtn.style.display = "none";
}
window.onclick = function close(e) {
    if (e.target == hd_popupBtn) {
        hd_popupBtn.style.display = "none";
    }
}
