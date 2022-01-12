<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $prodcuts = $_POST['Products'];
    $total_price = $_POST['Totalprice'];
    $discoint_coin = $_POST['discount_coin'];
    $prodcuts_quantity = $_POST['products_quantity'];


    for($i=0 ; $i < count($prodcuts); $i++){
        $sql_update_product = "UPDATE SHOPPING_CART SET PRODUCT_QUANTITY = ?,TOTAL_PRICE = ?,DISCOUNT_COIN = ? WHERE PRODUCT_ID = ?";
        $statement_update_product = $pdo -> prepare($sql_update_product);
        $statement_update_product ->bindValue(1, $prodcuts_quantity[$i]);
        $statement_update_product ->bindValue(2, $total_price);
        $statement_update_product ->bindValue(3, $discoint_coin);
        $statement_update_product ->bindValue(4, $prodcuts[$i]['PRODUCT_ID']);
        $statement_update_product ->execute();
    }
    


    echo json_encode($prodcuts[1]['PRODUCT_QUANTITY']);
    
?>
