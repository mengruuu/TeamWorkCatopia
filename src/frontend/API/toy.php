<?php
    $db_host = "127.0.0.1";
    $db_user = "root";
    $db_pass = "gtr123456";
    $db_select = "CATOPIA";
    $dsn = "mysql:host=".$db_host.";dbname=".$db_select;
    $pdo = new PDO($dsn, $db_user, $db_pass);
    $sql = "SELECT * FROM PRODUCT WHERE PRODUCT_TYPE_NAME = ?";
    $data = [];
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    // $products = file_get_contents('php://input');//獲取非表單資料
    
    $statment = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statment->bindValue(1, "玩具");
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>