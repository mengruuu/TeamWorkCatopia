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

    $delete_shopping_cart = "DELETE * from SHOPPING_CART";
    $statement_delete_shopping = $pdo ->prepare($delete_shopping_cart);
    $statement_delete_shopping->execute();

?>