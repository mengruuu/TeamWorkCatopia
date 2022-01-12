<?php

include("../../library/Connection.php");

$title = $_POST["title"];
$content = $_POST["content"];
$img = $_POST["img"];
$_idNumber = $_POST["idNumber"];
// 建立SQL語法
$sql = "UPDATE CATOPIA.ARTICLE  SET ARTICLE_TITLE = ? ,ARTICLE_CONTENT = ?,ARTICLE_PICTURE = ?  WHERE ARTICLE_ID = ?";


// 執行
$statement = $pdo->prepare($sql);
$statement->bindValue(1 , $title); 
$statement->bindValue(2 , $content); 
$statement->bindValue(3 , $img);
$statement->bindValue(4 , $_idNumber);
$statement->execute();

echo ('修改成功')

?>