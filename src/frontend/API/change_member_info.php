<?php
    include("../library/member.php");
    include("../library/Connection.php");
    $new_password = $_POST['new_password'];
    $new_name = $_POST['new_name'];
    $new_phone = $_POST['new_phone'];
    $new_address = $_POST['new_address'];

    $change_info = "UPDATE MEMBER SET MEMBER_PASSWORD = ?, MEMBER_NAME = ? , MEMBER_PHONE = ?, MEMBER_ADDRESS = ?";
    $statement_change = $pdo ->prepare($change_info);
    $statement_change->bindValue(1, $new_password);
    $statement_change->bindValue(2, $new_name);
    $statement_change->bindValue(3, $new_phone);
    $statement_change->bindValue(4, $new_address);
    $statement_change->execute();
    $data_change = $statement_change -> fetchAll();

    echo json_encode('修改成功');

?>