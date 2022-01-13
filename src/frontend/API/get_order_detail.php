<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $ORDER_ID = json_decode(file_get_contents("php://input"));
    $get_order_detail = "SELECT * FROM `V_ORDER_ALL_PRODUCT` WHERE ORDER_ID = ?";
    
    $statement_order_detail = $pdo -> prepare($get_order_detail);
    $statement_order_detail ->bindValue(1, $ORDER_ID);
    $statement_order_detail -> execute();
    $data_order_detail = $statement_order_detail -> fetchAll();
    if($data_order_detail > 0){
        echo json_encode($data_order_detail);
    }

?>