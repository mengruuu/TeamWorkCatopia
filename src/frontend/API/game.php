<?php
    include("../library/Connection.php");
    include("../library/member.php");
    
    //抓取MEMBER_ID資料
    session_start(); 
    $MEMBER_ID = ($_SESSION["MEMBER_ID"]); 
    $addCOIN = $_POST['addCOIN'];
    $check;

    //建立SQL 找到gacha訂單明細中 PRODUCT_NAME是空值 再依序推進去
    $sql_gameCoin = "UPDATE CATOPIA.MEMBER
    set
        CATOPIA_COIN = CATOPIA_COIN + ?
    where
        MEMBER_ID = ? ";

    $statement_gameCoin = $pdo ->prepare($sql_gameCoin);

    $statement_gameCoin->bindValue(1, $addCOIN);
    $statement_gameCoin->bindValue(2, $MEMBER_ID);

    //執行
    $statement_gameCoin->execute();
    $data_gameCoin_insert = $statement_gameCoin -> fetchAll();
    // $pdo->query($sql);

    echo "新增成功!"

?>