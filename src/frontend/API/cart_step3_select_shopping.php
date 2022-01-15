<?php
	include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();

    //找到TOTALPRICE
    $sql_shopping = "SELECT * FROM SHOPPING_CART JOIN PRODUCT ON SHOPPING_CART.PRODUCT_ID = PRODUCT.PRODUCT_ID WHERE MEMBER_ID = ?";
    $statement_shopping = $pdo -> prepare($sql_shopping);
    $statement_shopping->bindValue(1, $MEMBER_ID);    
    $statement_shopping ->execute();
    $data_shopping = $statement_shopping ->fetchAll();


    echo json_encode($data_shopping);

?>
