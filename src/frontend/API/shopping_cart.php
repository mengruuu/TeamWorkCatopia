<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $get_shopping_cart = "SELECT * FROM  SHOPPING_CART JOIN PRODUCT ON SHOPPING_CART.PRODUCT_ID = PRODUCT.PRODUCT_ID  WHERE MEMBER_ID = ? and PRODUCT_TYPE_NAME != '盲抽' ";
    $statement = $pdo -> prepare($get_shopping_cart);
    $statement ->bindValue(1, $MEMBER_ID);
    $statement -> execute();
    $data_shopping_cart = $statement ->fetchAll();
    echo json_encode($data_shopping_cart);

        // echo json_encode('購物車無物品');
    
?>
