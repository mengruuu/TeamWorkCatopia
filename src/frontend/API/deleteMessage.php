<?php
<<<<<<< HEAD
    $db_host = "127.0.0.1";
    $db_user = "root";
    $db_pass = "gtr123456";
    $db_select = "CATOPIA";
    $dsn = "mysql:host=".$db_host.";dbname=".$db_select;
    $pdo = new PDO($dsn, $db_user, $db_pass);
=======
    include("../library/Connection.php");
>>>>>>> 1004d3efd199c87730418a139feb9e87ceb602e4
    // 刪除對應的貼文
    $postID = json_decode(file_get_contents('php://input'));//獲取非表單資料

    // -----------------------------------------------------------------------
    // 先刪除按過此篇貼文的讚紀錄
    $sql = "DELETE FROM `POST_RESPONSE&LIKE` WHERE POST_ID = ?";
    $statment = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statment->bindValue(1, $postID);
    $statment->execute();

    // -----------------------------------------------------------------------
    // 再刪除此篇貼文
    $sql = "DELETE FROM MESSAGE WHERE POST_ID = ?";
    
    $statment = $pdo->prepare($sql);
    $statment->bindValue(1, $postID);
    $statment->execute();

    // -----------------------------------------------------------------------
    // 取得更新後的留言版資訊
    $sql = "SELECT * FROM MESSAGE";
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    
    $statmentget = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statmentget->execute();
    $data = $statmentget->fetchAll();

    echo json_encode($data);
?>