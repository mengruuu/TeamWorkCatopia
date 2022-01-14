<?php
    include("../library/Connection.php");
    include("../library/member.php");

    //抓取MEMBER_ID資料
    // session_start(); 
    // $MEMBER_ID = ($_SESSION["MEMBER_ID"]); 
    $MEMBER_ID = getMemberID(); 
    $check;

    
    //建立SQL語法 撈出遊戲最高分
    $sql = "SELECT GAME_HIGHSCORE FROM CATOPIA.MEMBER WHERE MEMBER_ID = ?";

    //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
    $statement = $pdo->prepare($sql);

    $statement->bindValue(1, $MEMBER_ID);    

    $statement->execute();
    //抓出全部且依照順序封裝成一個二維陣列
    $data = $statement->fetchAll();

    echo $data[0][0];
    // echo json_encode($data[0][0]);  

?>