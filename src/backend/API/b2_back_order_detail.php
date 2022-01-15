<?php
    include("../../library/Connection.php");

    //抓取資料
    $ORDER_ID = $_POST['order_id'];
    $check;

    $get_order_info = "SELECT * FROM `v_product_order_detail`
    WHERE `ORDER_ID` = ?";

    $statement_order_info = $pdo -> prepare($get_order_info);

    $statement_order_info->bindValue(1, $ORDER_ID);

    $statement_order_info -> execute();
    
    $data_order_info = $statement_order_info -> fetchAll();
    if($data_order_info >0){
        echo json_encode($data_order_info);
    }
?>