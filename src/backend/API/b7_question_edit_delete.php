<?php

include("../../library/Connection.php");

$question_id = $_GET["question_id"];
// 建立SQL語法
$sql = "DELETE FROM ROBOT  WHERE QUESTION_ID = ?";

echo($question_id);
// 執行
$statement = $pdo->prepare($sql);
$statement->bindValue(1 , $question_id);
$statement->execute();

echo ('修改成功')

?>