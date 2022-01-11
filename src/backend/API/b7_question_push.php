<?php

include("../../library/Connection.php");

$question = htmlspecialchars($_POST["question"]);
$answer = htmlspecialchars($_POST["answer"]);
// 建立SQL語法
$sql = "INSERT INTO ROBOT(QUESTION_CONTENT, ANSWER_CONTENT)VALUES(?, ?)";

// 執行
$statement = $pdo->prepare($sql);
$statement->bindValue(1 , $question); 
$statement->bindValue(2 , $answer); 
$statement->execute();

echo ('修改成功')
?>