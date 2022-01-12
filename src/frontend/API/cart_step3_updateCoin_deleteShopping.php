<?php
	include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $discount_coin = $_POST['discount_coin'];

    $sql_delete_shopping = "DELETE FROM SHOPPING_CART WHERE MEMBER_ID = ?";
    $statement_shopping_detail = $pdo ->prepare($sql_delete_shopping);
    $statement_shopping_detail->bindValue(1, $MEMBER_ID);
    $statement_shopping_detail->execute();


    $sql_get_coin = "SELECT CATOPIA_COIN FROM MEMBER WHERE MEMBER_ID = ?";
    $statement_get_coin = $pdo ->prepare($sql_get_coin);
    $statement_get_coin->bindValue(1, $MEMBER_ID);
    $statement_get_coin -> execute();
    $data_coin = $statement_get_coin ->fetchAll();

    $coin = intval($data_coin[0]['CATOPIA_COIN']);
    $left_coin = $coin - $discount_coin;

    $sql_update_coin = "UPDATE MEMBER SET CATOPIA_COIN = ? WHERE MEMBER_ID =?";
    $statement_update_coin = $pdo ->prepare($sql_update_coin);
    $statement_update_coin->bindValue(1, $left_coin);
    $statement_update_coin->bindValue(2, $MEMBER_ID);
    $statement_update_coin->execute();

    echo json_encode($data_coin);


?>
