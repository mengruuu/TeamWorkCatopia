<?php
	include("../../library/Connection.php");
    include("../../library/member.php");


    $member_mail = htmlspecialchars($_POST['email']);
    $member_password = htmlspecialchars($_POST['password']);

    $member_login = "SELECT * FROM MEMBER WHERE MEMBER_MAIL = ? and MEMBER_PASSWORD = ? and MEMBER_TYPE = 1";
    $statement_login = $pdo -> prepare($member_login);
    $statement_login->bindValue(1, $member_mail);
    $statement_login->bindValue(2, $member_password);
    $statement_login -> execute();
    $data_login = $statement_login -> fetchAll();

    if(count($data_login) > 0){
        echo json_encode($data_login);
        session_start();
        $_SESSION['MEMBER_ID'] = $data_login[0]['MEMBER_ID'];
        // echo json_encode($_SESSION['MEMBER_ID']);
    }else{
        echo json_encode('false');
    }
    
?>