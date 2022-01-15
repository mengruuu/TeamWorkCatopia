<?php
    include("../../library/Connection.php");
    $get_order_info = "SELECT DISTINCT * FROM v_member_order_order_detail";

    $statement_order_info = $pdo -> prepare($get_order_info);

    $statement_order_info -> execute();
    $data_order_info = $statement_order_info -> fetchAll();
    if($data_order_info >0){
        echo json_encode($data_order_info);
    }
?>