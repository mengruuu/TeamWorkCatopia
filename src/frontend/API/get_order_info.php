<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $get_order_info = "SELECT * FROM `ORDER` WHERE ?";
    $statement_order_info = $pdo -> prepare($get_order_info);
    $statement_order_info ->bindValue(1, $MEMBER_ID);
    $statement_order_info -> execute();
    $data_order_info = $statement_order_info -> fetchAll();
    if($data_order_info >0){
        echo json_encode($data_order_info);
    }
?>