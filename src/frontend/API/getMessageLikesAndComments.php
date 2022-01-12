<?php
    include("../library/Connection.php");
    $memberID = json_decode(file_get_contents('php://input'));

    $sql = "SELECT * FROM `POST_RESPONSE&LIKE` WHERE `RESPONSE&LIKE_MEMBER_ID` = ?";
    $statment = $pdo->prepare($sql);
    $statment->bindValue(1, $memberID);
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>