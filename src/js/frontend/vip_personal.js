var popupBtn = document.getElementById('background_pop');
var close = document.getElementById('close_btn');
function show(){
    popupBtn.style.display = "block";
}
close.onclick = function close() {
    popupBtn.style.display = "none";
}
window.onclick = function close(e) {
    if (e.target == popupBtn) {
        popupBtn.style.display = "none";
    }
}