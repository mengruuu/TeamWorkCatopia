<?php
	include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();

    $sql_delete_shopping = "DELETE FROM SHOPPING_CART WHERE MEMBER_ID = ?";
    $statement_shopping_detail = $pdo ->prepare($sql_delete_shopping);
    $statement_shopping_detail->bindValue(1, $MEMBER_ID);
    $statement_shopping_detail->execute();

    echo json_encode('刪除成功');


?>
