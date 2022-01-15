<?php

    include("../library/Connection.php");
    // 刪除對應的貼文
    $postUpdate = json_decode(file_get_contents('php://input'));//獲取非表單資料

    // // -----------------------------------------------------------------------
    // // 先刪除按過此篇貼文的讚紀錄
    // $sql = "DELETE FROM `POST_RESPONSE&LIKE` WHERE POST_ID = ?";
    // $statment = $pdo->prepare($sql);
    // // $statment->bindValue(1, "%".json_decode($name)."%");
    // $statment->bindValue(1, $postID);
    // $statment->execute();

    // -----------------------------------------------------------------------
    // 更新此篇貼文
    $sql = "UPDATE MESSAGE SET POST_CONTENT = ? WHERE POST_ID = ?";
    
    $statment = $pdo->prepare($sql);
    $statment->bindValue(1, $postUpdate -> postValue);
    $statment->bindValue(2, $postUpdate -> id);
    $statment->execute();

    // -----------------------------------------------------------------------
    // 取得更新後的留言版資訊
    $sql = "SELECT * 
    FROM 
     MESSAGE
     NATURAL JOIN MEMBER";
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    
    $statmentget = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statmentget->execute();
    $data = $statmentget->fetchAll();

    echo json_encode($data);
?>