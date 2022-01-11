<?php
    $db_host = "127.0.0.1";
    $db_user = "root";
    $db_pass = "gtr123456";
    $db_select = "CATOPIA";
    $dsn = "mysql:host=".$db_host.";dbname=".$db_select;
    $pdo = new PDO($dsn, $db_user, $db_pass);
    // 刪除對應的貼文
    $sql = "INSERT INTO MESSAGE (MEMBER_ID, POST_TIME, POST_PICTURE, POST_CONTENT) VALUES(?, NOW(), ?, ?)";
    $postContent = json_decode(file_get_contents('php://input'));//獲取非表單資料
    $statment = $pdo->prepare($sql);
    $statment->bindValue(1, $postContent->memberId);
    $statment->bindValue(2, $postContent->postImg);
    $statment->bindValue(3, $postContent->postContent);
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