<?php
$pay_method = $_POST['Payment_method'];
$order_name = $_POST['Order_name'];
$order_phone = $_POST['Order_phone'];
$deliver_way = $_POST['deliver'];
$deliver_address = $_POST['Address'];


session_start();
$_SESSION['pay_method'] = $pay_method;
$_SESSION['order_name'] = $order_name;
$_SESSION['order_phone'] = $order_phone;
$_SESSION['deliver_way'] = $deliver_way;
$_SESSION['deliver_address'] = $deliver_address;






echo json_encode($_SESSION['order_phone']);
?>