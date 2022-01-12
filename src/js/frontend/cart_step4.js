login_check();
get_order_ID();
function get_order_ID(){
    // console.log(location.search);
    let num = location.search.lastIndexOf('=');
    // console.log(num);
    let ID = location.search.substring(num + 1);
    // console.log(ID);
    $('#order_ID').append(ID);

}