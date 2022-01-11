<?php
    include("../library/Connection.php");
    // 刪除對應的貼文
    $sql = "DELETE FROM MESSAGE WHERE POST_ID = ?";
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    $memberId = json_decode(file_get_contents('php://input'));//獲取非表單資料
    
    $statment = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statment->bindValue(1, $memberId);
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