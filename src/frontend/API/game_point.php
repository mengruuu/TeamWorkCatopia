<?php
    include("../library/Connection.php");
    include("../library/member.php");
    
    //抓取MEMBER_ID資料
   
    $MEMBER_ID = getMemberID();
    $addCOIN = $_POST['addCOIN'];
    $check;

    //建立SQL 遊戲賺到的奴幣寫進資料庫
    $sql_gameCoin = "UPDATE MEMBER
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