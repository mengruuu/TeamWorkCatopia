<?php
    include("../library/Connection.php");
    include("../library/member.php");

    //抓取資料
    $PRODUCT_NAME = $_POST['PRODUCT_NAME'];
    $check;
    
        //抓取資料
        session_start(); 
        $MEMBER_ID = ($_SESSION["MEMBER_ID"]); 
        $check;
        
        $sql = "SELECT ORDER_ID FROM `ORDER` WHERE MEMBER_ID = 1";
        
        //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
        $statement = $pdo ->prepare($sql);
        
        // $statement->bindValue(1, $MEMBER_ID);   
        
        $statement->execute();
        //抓出全部且依照順序封裝成一個二維陣列
        $data = $statement->fetchAll();
        
        $ORDER_ID = $data[0][0];

        // print_r($ORDER_ID);
        
    // echo $ORDER_ID[0][0];

    //建立SQL 找到gacha訂單明細中 PRODUCT_NAME是空值 再依序推進去
    $sql_gacha299 = "UPDATE CATOPIA.`ORDER_DETAIL(ORDER- PRODUCT)`
    set
        PRODUCT_NAME = ?
    where
        ORDER_ID = ? and PRODUCT_NAME is null
    limit 1";

    $statement_gacha299 = $pdo ->prepare($sql_gacha299);

    $statement_gacha299->bindValue(1, $PRODUCT_NAME);
    $statement_gacha299->bindValue(2, $ORDER_ID);

    //執行
    $statement_gacha299->execute();
    $data_gacha299_insert = $statement_gacha299 -> fetchAll();
    // $pdo->query($sql);

    echo "新增成功!"

?>