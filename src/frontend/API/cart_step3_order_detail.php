<?php
	include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $order_ID = $_POST['ORDERID'];
    $order_info = $_POST['order_info'];
    $products_name = $_POST['products_name'];
    $products_quantity = $_POST['products_quantity'];
    $payment_mode = '已付款';
    if($order_info[2] == '貨到付款'){
        $payment_mode = '未付款';
    };
    
    for($i=0; $i < count($products_name) ;$i++){
        $sql_insert_order_detail = "INSERT INTO `ORDER_DETAIL(ORDER- PRODUCT)`(ORDER_ID, PRODUCT_NAME, PRODUCT_QUANTITY, PAYMENT_MODE, PAYMENT_METHOD, RECIPIENT_NAME, RECIPIENT_PHONE, SHIPPING_ADDRESS, SHIPPING_METHOD)
        VALUE(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $statement_order_detail = $pdo ->prepare($sql_insert_order_detail);
        $statement_order_detail->bindValue(1, $order_ID);
        $statement_order_detail->bindValue(2, $products_name[$i]);
        $statement_order_detail->bindValue(3, $products_quantity[$i]);
        $statement_order_detail->bindValue(4, $payment_mode);

        $statement_order_detail->bindValue(5, $order_info[2]);

        $statement_order_detail->bindValue(6, $order_info[0]);
        $statement_order_detail->bindValue(7, $order_info[1]);
        $statement_order_detail->bindValue(8, $order_info[4]);
        $statement_order_detail->bindValue(9, $order_info[3]);
        $statement_order_detail->execute();
    }

    echo json_encode($order_ID);


?>
