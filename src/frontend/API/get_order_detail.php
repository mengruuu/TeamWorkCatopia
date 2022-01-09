<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $get_order_detail = "SELECT * FROM `ORDER_DETAIL(ORDER- PRODUCT)` WHERE MEMBER_ID = ?";
    
    $statement_order_detail = $pdo -> prepare($get_order_detail);
    $statement_order_detail ->bindValue(1, $MEMBER_ID);
    $statement_order_detail -> execute();
    $data_order_detail = $statement_order_detail -> fetchAll();
    if($data_order_detail > 0){
        echo json_encode($data_order_detail);
    }

?>