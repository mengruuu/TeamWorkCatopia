<?php

include("../../library/Connection.php");


//抓取資料
$product_name = $_POST['productName'];
$product_type_name = $_POST['productType'];
$product_feature = $_POST['productFeature'];
$product_picture1 = $_POST['productPicture1'];
$product_picture2 = isset($_POST['productPicture2']) ? $_POST['productPicture2'] : null;
$product_picture3 = isset($_POST['productPicture3']) ? $_POST['productPicture3'] : null;
$product_picture4 = isset($_POST['productPicture4']) ? $_POST['productPicture4'] : null;
$product_content = $_POST['productContent'];
$product_price = $_POST['productPrice'];
$check;

// 分類判斷
// 食品
if( $product_type_name == 0){
        $product_type_name = '食品';

        if( $product_feature == 0){
                $product_feature = '骨骼';
        }else{
                $product_feature = '毛髮';
        }
};

// 用品
if( $product_type_name == 1){
        $product_type_name = '用品';

        if( $product_feature == 0){
                $product_feature = '外出包包';
        }else if( $product_feature == 1){
                $product_feature = '小窩';
        }else if( $product_feature == 2){
                $product_feature = '抓板';
        }else if( $product_feature == 3){
                $product_feature = '食器';
        }else if( $product_feature == 4){
                $product_feature = '貓砂盆';
        }
        else{
                $product_feature = '胸背帶';
        }
};

// 玩具
if( $product_type_name == 2){
        $product_type_name = '玩具';

        if( $product_feature == 0){
                $product_feature = '單貓';
        }else{
                $product_feature = '人貓';
        }
};

// 裝飾品
if( $product_type_name == 3){
        $product_type_name = '裝飾品';

        if( $product_feature == 0){
                $product_feature = '衣服';
        }else{
                $product_feature = '頭套';
        }
};

// 盲抽
if( $product_type_name == 4){
        $product_type_name = '盲抽';

        if( $product_feature == 0){
                $product_feature = '299';
        }else{
                $product_feature = '399';
        }
};



// 建立SQL語法    //新增商品
$sql = "INSERT INTO PRODUCT (PRODUCT_NAME, PRODUCT_TYPE_NAME, PRODUCT_FEATURE, PRODUCT_PICTURE1, PRODUCT_PICTURE2, 
                             PRODUCT_PICTURE3, PRODUCT_PICTURE4, PRODUCT_CONTENT, PRODUCT_PRICE) 
        VALUE ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// `./images/products/${product_type_name}/${product_feature}/${product_name}_1`

// 執行
$statement = $pdo->prepare($sql);
$statement->bindValue(1 , $product_name); 
$statement->bindValue(2 , $product_type_name); 
$statement->bindValue(3 , $product_feature);
// $statement->bindValue(4 , './images/products/'.$product_type_name.'/'.$product_feature.'/'.$product_name.'_1'); 
$statement->bindValue(4 , $product_picture1); 
$statement->bindValue(5 , $product_picture2); 
$statement->bindValue(6 , $product_picture3);
$statement->bindValue(7 , $product_picture4); 
$statement->bindValue(8 , $product_content); 
$statement->bindValue(9 , $product_price);
$statement->execute();



$sql = "SELECT PRODUCT_PICTURE1 FROM PRODUCT";
$statement = $pdo->prepare($sql);
$statement->execute();
$data = $statement->fetchAll();

echo json_encode("上架成功");
?>

