<?php
    include("../library/Connection.php");
    // 取得留言版資訊
    $sql = "SELECT * FROM
    `POST_RESPONSE&LIKE` AS POSTR
    JOIN MEMBER ON POSTR.`RESPONSE&LIKE_MEMBER_ID` = MEMBER.MEMBER_ID WHERE POST_RESPONSE_CONTENT IS NOT NULL";
    $statment = $pdo->prepare($sql);
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>