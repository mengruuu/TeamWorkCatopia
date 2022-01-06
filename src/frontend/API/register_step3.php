<?php
    include("../library/Connection.php");
        session_start();
        $register = "INSERT INTO MEMBER(MEMBER_MAIL, MEMBER_PASSWORD, MEMBER_NAME, MEMBER_PHONE, MEMBER_ADDRESS, REGISTER_TIME) VALUES (?,?,?,?,?,NOW())";
        $statement = $pdo ->prepare($register);
        $statement ->bindValue(1, htmlspecialchars($_SESSION['temp_member_info'][0]));
        $statement ->bindValue(2, htmlspecialchars($_SESSION['temp_member_info'][1]));
        $statement ->bindValue(3, htmlspecialchars($_SESSION['temp_member_info'][2]));
        $statement ->bindValue(4, htmlspecialchars($_SESSION['temp_member_info'][3]));
        $statement ->bindValue(5, htmlspecialchars($_SESSION['temp_member_info'][4]));
        $statement ->execute();

    echo "新增成功";
?>