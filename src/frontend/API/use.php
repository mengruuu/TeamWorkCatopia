<?php
    include("../library/Connection.php");
<<<<<<< HEAD
=======

>>>>>>> 5fee9a8c1ba47de1abd90033a87d5c34f38d4485
    $sql = "SELECT * FROM PRODUCT WHERE PRODUCT_TYPE_NAME = ?";
    $data = [];
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    // $products = file_get_contents('php://input');//獲取非表單資料
    
    $statment = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statment->bindValue(1, "用品");
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>