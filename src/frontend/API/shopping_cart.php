<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $get_shopping_cart = "SELECT * FROM CATOPIA.v_product_shopping_cart WHERE MEMBER_ID = ? and PRODUCT_TYPE_NAME != '盲抽' ";
    $statement = $pdo -> prepare($get_shopping_cart);
    $statement ->bindValue(1, $MEMBER_ID);
    $statement -> execute();
    $data_shopping_cart = $statement -> fetchAll();
    if($data_shopping_cart >0){
        echo json_encode($data_shopping_cart);
    }
?>
