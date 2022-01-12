<?php
	include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();

    //找到TOTALPRICE
    $sql_shopping = "SELECT * FROM CATOPIA.v_product_shopping_cart";
    $statement_shopping = $pdo -> prepare($sql_shopping);
    $statement_shopping ->execute();
    $data_shopping = $statement_shopping ->fetchAll();


    echo json_encode($data_shopping);

?>
