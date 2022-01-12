<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $prodcut_ID = $_POST['product_ID'];

    $sql_delete_product = "DELETE FROM SHOPPING_CART WHERE PRODUCT_ID = ?";
    $statement_delete_product = $pdo -> prepare($sql_delete_product);
    $statement_delete_product ->bindValue(1, $prodcut_ID);
    $statement_delete_product ->execute();

    echo json_encode('刪除成功');
    
?>
