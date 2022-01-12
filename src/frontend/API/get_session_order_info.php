<?php
    session_start();
    $order_name = $_SESSION['order_name'];
    $order_phone = $_SESSION['order_phone'];
    $pay_method = $_SESSION['pay_method'];
    $deliver_way = $_SESSION['deliver_way'];
    $deliver_address = $_SESSION['deliver_address'];
    $_SESSION['temp_order_info'] = [
        $order_name,
        $order_phone,
        $pay_method,
        $deliver_way,
        $deliver_address];
    
    
    echo json_encode($_SESSION['temp_order_info']);
?>