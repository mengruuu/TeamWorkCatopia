<?php

include("../../library/Connection.php");

// 建立SQL語法
$sql = "SELECT * FROM ARTICLE";
// 執行
$statement = $pdo->prepare($sql);
$statement->execute();

// 抓出來封裝成一個二為陣列
$data = $statement->fetchAll();

// 印出json格式檔
echo json_encode($data);
?>