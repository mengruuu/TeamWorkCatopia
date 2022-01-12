<?php
    include("../library/Connection.php");

    //抓取資料
    $PRODUCT_FEATURE = $_POST['PRODUCT_FEATURE'];
    $check;

    
    //建立SQL語法
    $sql = "SELECT * FROM CATOPIA.PRODUCT WHERE PRODUCT_FEATURE = ?";

    //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
    $statement = $pdo->prepare($sql);

    $statement->bindValue(1, $PRODUCT_FEATURE);   

    $statement->execute();
    //抓出全部且依照順序封裝成一個二維陣列
    $data = $statement->fetchAll();

    echo json_encode($data);  

?>