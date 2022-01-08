<?php

//開資料庫
include("../library/Connection.php");;
   $question = htmlspecialchars($_GET["question"]);
   //建立SQL語法
   $sql = "SELECT * FROM ROBOT WHERE QUESTION_CONTENT like ?";
       
    //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
    //$statement = $pdo->query($sql);
    $statement = $pdo->prepare($sql);
    //模糊收尋
    $statement->bindValue(1,"%".$question."%");

    $statement->execute();
       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll();

       echo json_encode($data);    

?>