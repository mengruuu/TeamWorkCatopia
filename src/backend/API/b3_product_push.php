<?php

include("../../library/Connection.php");


//抓取資料
$product_name = $_POST['productName'];
$product_type_name = $_POST['productType'];
$product_feature = $_POST['productFeature'];
// $productPicture1 = $_POST[''];
// $productPicture2 = $_POST[''];
// $productPicture3 = $_POST[''];
// $productPicture4 = $_POST[''];
$product_content = $_POST['productContent'];
$product_price = $_POST['productPrice'];
$check;



// 建立SQL語法    //新增商品
$sql = "INSERT INTO PRODUCT (PRODUCT_NAME, PRODUCT_TYPE_NAME, PRODUCT_FEATURE, PRODUCT_PICTURE1, PRODUCT_PICTURE2, 
                             PRODUCT_PICTURE3, PRODUCT_PICTURE4, PRODUCT_CONTENT, PRODUCT_PRICE) 
        VALUE ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// 執行
$statement = $pdo->prepare($sql);
$statement->bindValue(1 , $product_name); 
$statement->bindValue(2 , $product_type_name); 
$statement->bindValue(3 , $product_feature);
$statement->bindValue(4 , 'img'); 
$statement->bindValue(5 , ''); 
$statement->bindValue(6 , '');
$statement->bindValue(7 , ''); 
$statement->bindValue(8 , $product_content); 
$statement->bindValue(9 , $product_price);
$statement->execute();

echo ('新增成功');
?>

