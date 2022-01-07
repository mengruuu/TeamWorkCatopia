<?php
    include("../library/Connection.php");
    
    //建立SQL語法
    // $sql = "SELECT * FROM ARTICLE;";
    $sql = "SELECT * FROM PRODUCT WHERE PRODUCT_TYPE_NAME = ? && PRODUCT_FEATURE = ?";

    //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
    $statement = $pdo->prepare($sql);

    $statement->bindValue(1, "盲抽");
    $statement->bindValue(2, "299");    

    $statement->execute();
    //抓出全部且依照順序封裝成一個二維陣列
    $data = $statement->fetchAll();

    echo json_encode($data);  

?>