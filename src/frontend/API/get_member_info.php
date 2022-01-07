<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $get_member_info = "SELECT * FROM MEMBER WHERE MEMBER_ID = ?";
    $statement_info = $pdo -> prepare($get_member_info);
    $statement_info ->bindValue(1, $MEMBER_ID);
    $statement_info -> execute();
    $data_member_info = $statement_info -> fetchAll();
    if($data_member_info >0){
        echo json_encode($data_member_info);
    }
?>