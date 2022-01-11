<?php

include("../../library/Connection.php");

$question = $_GET["question"];
$answer = $_GET["answer"];
$question_id = $_GET["question_id"];
// 建立SQL語法
$sql = "UPDATE CATOPIA.ROBOT  SET QUESTION_CONTENT = ? ,ANSWER_CONTENT = ?  WHERE QUESTION_ID = ?";


// 執行
$statement = $pdo->prepare($sql);
$statement->bindValue(1 , $question); 
$statement->bindValue(2 , $answer); 
$statement->bindValue(3 , $question_id);
$statement->execute();

echo ('修改成功')

?>