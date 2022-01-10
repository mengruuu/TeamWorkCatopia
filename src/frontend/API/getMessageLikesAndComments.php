<?php
    $db_host = "127.0.0.1";
    $db_user = "root";
    $db_pass = "password";
    $db_select = "CATOPIA";
    $dsn = "mysql:host=".$db_host.";dbname=".$db_select;
    $pdo = new PDO($dsn, $db_user, $db_pass);

    $memberID = json_decode(file_get_contents('php://input'));

    $sql = "SELECT * FROM `POST_RESPONSE&LIKE` WHERE `RESPONSE&LIKE_MEMBER_ID` = ?";
    $statment = $pdo->prepare($sql);
    $statment->bindValue(1, $memberID);
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>