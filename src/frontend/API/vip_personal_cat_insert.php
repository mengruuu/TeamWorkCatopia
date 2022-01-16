<?php
    include("../library/Connection.php");
    include("../library/member.php");

    //抓取資料
    session_start(); 
    $MEMBER_ID = ($_SESSION["MEMBER_ID"]); 
    $VIP_CAT_ICON = $_POST['VIP_CAT_ICON'];
    $check;


    //建立SQL 找到gacha訂單明細中 PRODUCT_NAME是空值 再依序推進去
    $sql_VIP_CAT_ICON = "UPDATE MEMBER
    set
        MEMBER_PICTURE = ?
    where
        MEMBER_ID = ?";

    $statement_VIP_CAT_ICON = $pdo ->prepare($sql_VIP_CAT_ICON);

    $statement_VIP_CAT_ICON->bindValue(1, $VIP_CAT_ICON);
    $statement_VIP_CAT_ICON->bindValue(2, $MEMBER_ID);

    //執行
    $statement_VIP_CAT_ICON->execute();
    $data_VIP_CAT_ICON_insert = $statement_VIP_CAT_ICON -> fetchAll();
    // $pdo->query($sql);

    echo "新增成功!"

?>