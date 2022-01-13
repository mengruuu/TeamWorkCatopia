<?php
    include("../library/Connection.php");
<<<<<<< HEAD
=======

>>>>>>> 17a75ae376e52dae7c6f6834a1f64d0800b43877
    $sql = "SELECT * FROM PRODUCT WHERE PRODUCT_TYPE_NAME = ?";
    $data = [];
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    // $products = file_get_contents('php://input');//獲取非表單資料
    
    $statment = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statment->bindValue(1, "裝飾品");
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>