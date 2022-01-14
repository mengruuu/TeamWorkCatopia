<?php
    include("../library/Connection.php");
    include("../library/member.php");
    
    //抓取MEMBER_ID資料
    session_start(); 
    $MEMBER_ID = ($_SESSION["MEMBER_ID"]); 
    $HIGHSCORE = $_POST['HIGHSCORE'];
    $check;

    //建立SQL 遊戲最高分有更新 寫進資料庫
    $sql_gameCoin = "UPDATE MEMBER
    set
        GAME_HIGHSCORE = ?
    where
        MEMBER_ID = ? ";

    $statement_gameCoin = $pdo ->prepare($sql_gameCoin);

    $statement_gameCoin->bindValue(1, $HIGHSCORE);
    $statement_gameCoin->bindValue(2, $MEMBER_ID);

    //執行
    $statement_gameCoin->execute();
    $data_gameCoin_insert = $statement_gameCoin -> fetchAll();
    // $pdo->query($sql);

    echo "新增成功!"

?>