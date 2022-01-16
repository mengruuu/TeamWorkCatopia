<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $ORDER_ID = json_decode(file_get_contents("php://input"));
    $get_order_detail = "SELECT * FROM 
    `ORDER_DETAIL(ORDER- PRODUCT)`
    JOIN PRODUCT  ON PRODUCT.PRODUCT_NAME = `ORDER_DETAIL(ORDER- PRODUCT)`.PRODUCT_NAME
    JOIN `ORDER`  ON `ORDER_DETAIL(ORDER- PRODUCT)`.ORDER_ID = `ORDER`.ORDER_ID WHERE `ORDER_DETAIL(ORDER- PRODUCT)`.ORDER_ID = ?;";
    
    $statement_order_detail = $pdo -> prepare($get_order_detail);
    $statement_order_detail ->bindValue(1, $ORDER_ID);
    $statement_order_detail -> execute();
    $data_order_detail = $statement_order_detail -> fetchAll();
    echo json_encode($data_order_detail);


?>