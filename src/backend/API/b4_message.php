<?php

    include("../../library/Connection.php");

    // 建立SQL語法
    $sql = "SELECT * 
    FROM 
     MESSAGE
     NATURAL JOIN MEMBER";

    // 執行
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $data = $statement->fetchAll();

    echo json_encode($data);

?>