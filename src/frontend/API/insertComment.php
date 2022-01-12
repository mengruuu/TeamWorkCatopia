<?php
    include("../library/Connection.php");
    // 刪除對應的貼文
    $sql = "INSERT INTO `POST_RESPONSE&LIKE` (POST_ID, `RESPONSE&LIKE_MEMBER_ID`, POST_RESPONSE_CONTENT) VALUES(?, ?, ?)";
    $postContent = json_decode(file_get_contents('php://input'));//獲取非表單資料
    $statment = $pdo->prepare($sql);
    $statment->bindValue(1, $postContent->postId);
    $statment->bindValue(2, $postContent->memberId);
    $statment->bindValue(3, $postContent->content);
    $statment->execute();

    // -----------------------------------------------------------------------
    // 取得更新後的留言版資訊
    $sql = "SELECT * FROM `POST_RESPONSE&LIKE`";
    $statment = $pdo->prepare($sql);
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>