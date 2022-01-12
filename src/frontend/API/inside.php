<?php
    include("../library/Connection.php");
    
    $sql = "SELECT * FROM PRODUCT WHERE PRODUCT_ID = ?";
    $data = [];
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    $id = json_decode(file_get_contents('php://input'));//獲取非表單資料
    
    $statment = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statment->bindValue(1, $id);
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>