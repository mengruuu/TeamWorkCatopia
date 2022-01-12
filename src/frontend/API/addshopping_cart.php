<?php
include("../library/member.php");
include("../library/Connection.php");
$MEMBER_ID = getMemberID();
$product_ID = $_POST['product_ID'];
$product_quantity = $_POST['quantity'];

$sql_check_product_isset = "SELECT * FROM SHOPPING_CART WHERE MEMBER_ID = ? AND PRODUCT_ID =?";
$statement_check = $pdo -> prepare($sql_check_product_isset);
$statement_check ->bindValue(1, $MEMBER_ID);
$statement_check ->bindValue(2, $product_ID);
$statement_check -> execute();
$data_check = $statement_check -> fetchAll();

if($data_check != []){
    $sql_update_shopping = "UPDATE SHOPPING_CART SET PRODUCT_QUANTITY = ? WHERE PRODUCT_ID = ?" ;
    $statement_update = $pdo -> prepare($sql_update_shopping);
    $statement_update ->bindValue(1, (intval($product_quantity) + intval($data_check[0]['PRODUCT_QUANTITY'])));
    $statement_update ->bindValue(2, $product_ID);
    $statement_update ->execute();
}else{
    $sql_insert_shopping = "INSERT INTO SHOPPING_CART(MEMBER_ID, PRODUCT_ID, PRODUCT_QUANTITY)
    VALUE(?, ?, ?)";
    $statement_insert = $pdo -> prepare($sql_insert_shopping);
    $statement_insert ->bindValue(1, $MEMBER_ID);
    $statement_insert ->bindValue(2, $product_ID);
    $statement_insert ->bindValue(3, $product_quantity);
    $statement_insert -> execute();
}

echo json_encode($data_check);
 
?>
