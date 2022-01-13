<?php
    include("../library/Connection.php");
    // 取得留言版資訊
    $sql = "SELECT * FROM `POST_RESPONSE&LIKE` WHERE POST_RESPONSE_CONTENT is not NULL";
    $statment = $pdo->prepare($sql);
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>