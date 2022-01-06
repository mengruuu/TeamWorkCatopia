<?php

//開資料庫
include("../library/Connection.php");;


   //建立SQL語法
   $sql = "SELECT * FROM ARTICLE;";
       
    //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
    //$statement = $pdo->query($sql);
    $statement = $pdo->query($sql);
    //getConn("dev")誇號裡面可以放入選擇的環境，讓switch去判斷現在該連在哪個資料庫
    $statement->execute();
       //抓出全部且依照順序封裝成一個二維陣列
       $data = $statement->fetchAll();

       echo json_encode($data);    

?>