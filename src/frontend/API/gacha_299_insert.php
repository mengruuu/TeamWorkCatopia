<?php
    include("../library/Connection.php");

    //抓取資料
    $PRODUCT_ID = $_POST['PRODUCT_ID'];
    $check;

    //建立SQL
    $sql = "INSERT INTO ORDER_DETAIL(ORDER- PRODUCT)(PRODUCT_ID) VALUE (?)";

    $statement->bindValue(1, $PRODUCT_ID);


    //執行
    $pdo->exec($sql);
    // $pdo->query($sql);

    echo "新增成功!"

?>