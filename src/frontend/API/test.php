<?php
	include("../library/member.php");
    include("../library/Connection.php");
    $MEMBER_ID = getMemberID();
    $order_ID = $_POST['ORDERID'];
   
    

        $sql_insert_order_detail = "SELECT  * FROM CATOPIA.`ORDER` WHERE ORDER_ID =? ";
        $statement_order_detail = $pdo ->prepare($sql_insert_order_detail);
        $statement_order_detail->bindValue(1, $order_ID);
        
        $statement_order_detail->execute();
        $data = $statement_order_detail->fetchAll();


    echo json_encode($data);


?>
