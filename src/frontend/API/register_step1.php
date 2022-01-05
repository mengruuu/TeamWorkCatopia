<?php
	include("../library/Connection.php");
    //----------------------------------------
    //抓取資料
    $member_mail = $_POST['email'];
    $member_password = $_POST['password'];
    $member_name = $_POST['name'];
    $member_phone = $_POST['phone'];
    $member_address = $_POST['address'];
    $check;

    //建立SQL
    // $sql = "INSERT INTO MEMBER(MEMBER_MAIL, MEMBER_PASSWORD, MEMBER_NAME, MEMBER_PHONE, MEMBER_ADDRESS, REGISTER_TIME) VALUES (?,?,?,?,?,NOW())";
    $member_check = "SELECT * FROM MEMBER WHERE MEMBER_MAIL = ?";
    $statement_check = $pdo ->prepare($member_check);
    $statement_check->bindValue(1, $member_mail);
    $statement_check->execute();
    $data_check = $statement_check -> fetchAll();
    if(count($data_check) > 0){
        $check = false;
    }else{
        $check = true;
    }
    
    if($check){
        session_start();
        $_SESSION['temp_member_info'] = [$member_mail,$member_password,$member_name,$member_phone,$member_address];
        
        echo "check成功";
    }
?>