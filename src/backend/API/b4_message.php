<?php

    include("../../library/Connection.php");

    // 建立SQL語法
    $sql = "SELECT * FROM `v_message_member`";

    // 執行
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $data = $statement->fetchAll();

    echo json_encode($data);

?>