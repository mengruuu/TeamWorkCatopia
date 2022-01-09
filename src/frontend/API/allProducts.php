<?php
    $db_host = "127.0.0.1";
    $db_user = "root";
<<<<<<< HEAD
    $db_pass = "password";
=======
<<<<<<< HEAD
    $db_pass = "gtr123456";
=======
    $db_pass = "gl4su06T";
>>>>>>> 5eceeff596c91b60120e482f9d9ffaf07b2254b3
>>>>>>> 4281b4b2a5fae5499a764b80e2d2bc40aa709044
    $db_select = "CATOPIA";
    $dsn = "mysql:host=".$db_host.";dbname=".$db_select;
    $pdo = new PDO($dsn, $db_user, $db_pass);
    $sql = "SELECT * FROM PRODUCT";
    $data = [];
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    // $products = file_get_contents('php://input');//獲取非表單資料
    
    $statment = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>