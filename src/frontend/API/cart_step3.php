<?php
	include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    // $order_info = $_POST['order_info'];
    $data = json_decode(file_get_contents("php://input"));
    //找到TOTALPRICE
    $sql_shopping = "SELECT * FROM PRODUCT JOIN SHOPPING_CART ON PRODUCT.PRODUCT_ID = SHOPPING_CART.PRODUCT_ID WHERE MEMBER_ID = ?";
    $statement_shopping = $pdo -> prepare($sql_shopping);
    $statement_shopping ->bindValue(1, $MEMBER_ID);
    $statement_shopping ->execute();
    $data_shopping = $statement_shopping ->fetchAll();
    // $give_back_coin = intval($data_shopping[0]['TOTAL_PRICE']) / 10;

    $give_back_coin = ($data -> total_price) / 10;
    $total_price = $data -> total_price;
    //INSERT INTO ORDER
    $sql_insert_order = "INSERT INTO `ORDER`(MEMBER_ID, ORDER_TIME, ORDER_MODE, TOTAL_PRICE, COIN_GIVEBACK, COIN_DISCOUNT)
    VALUE(?, NOW(), ?, ?, ?, ?);";
    $statement_insert_order = $pdo->prepare($sql_insert_order);
    $statement_insert_order->bindValue(1, $MEMBER_ID);
    // $statement_insert_order->bindValue(2, 'NOW()'); 
    $statement_insert_order->bindValue(2, "準備中");    
    $statement_insert_order->bindValue(3, $total_price);    
    $statement_insert_order->bindValue(4, $give_back_coin);
    $statement_insert_order->bindValue(5, $data_shopping[0]['DISCOUNT_COIN']);    
    $statement_insert_order->execute();


    $sql_get_order_ID = "SELECT last_insert_id();";
    $statement_order_ID = $pdo ->prepare($sql_get_order_ID);
    $statement_order_ID ->execute();
    $data_order_ID = $statement_order_ID -> fetchAll();


    // for($i=0; $i < count($data_shopping) ;$i++){
    //     $sql_insert_order_detail = "INSERT INTO CATOPIA.`ORDER_DETAIL(ORDER- PRODUCT)`(ORDER_ID, PRODUCT_NAME, PRODUCT_QUANTITY, PAYMENT_MODE, RECIPIENT_NAME, RECIPIENT_PHONE, SHIPPING_ADDRESS, SHIPPING_METHOD)
    //     VALUE(?, ?, ?, ?, ?, ?, ?, ?)";
    //     $statement_order_detail = $pdo ->prepare($sql_insert_order_detail);
    //     $statement_order_detail->bindValue(1, $order_ID);
    //     $statement_order_detail->bindValue(2, $data_shopping[$i]['PRODUCT_NAME']);
    //     $statement_order_detail->bindValue(3, $data_shopping[$i]['PRODUCT_QUANTITY']);
    //     $statement_order_detail->bindValue(4, $order_info[2]);
    //     $statement_order_detail->bindValue(5, $order_info[0]);
    //     $statement_order_detail->bindValue(6, $order_info[1]);
    //     $statement_order_detail->bindValue(7, $order_info[4]);
    //     $statement_order_detail->bindValue(8, $order_info[3]);
    //     $statement_order_detail->execute();
    // }

    echo json_encode($data_order_ID);

?>
