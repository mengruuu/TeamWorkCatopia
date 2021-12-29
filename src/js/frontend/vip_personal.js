var popupBtn = document.getElementById('background_pop');
var popupClick = document.getElementById('popup_click');
var close = document.getElementById('close_btn');
popupClick.addEventListener('click', function(){
    popupBtn.style.display = "block";
    // console.log('test');
})
close.onclick = function close() {
    popupBtn.style.display = "none";
}
window.onclick = function close(e) {
    if (e.target == popupBtn) {
        popupBtn.style.display = "none";
    }
}
