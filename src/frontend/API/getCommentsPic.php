<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = json_decode(file_get_contents('php://input'));//獲取非表單資料
    $get_member_info = "SELECT MEMBER_PICTURE FROM MEMBER WHERE MEMBER_ID = ?";
    $statement_info = $pdo -> prepare($get_member_info);
    $statement_info ->bindValue(1, $MEMBER_ID);
    $statement_info -> execute();  
    $data_member_info = $statement_info -> fetchAll();
    if($data_member_info >0){
        echo json_encode($data_member_info);
    }

?>