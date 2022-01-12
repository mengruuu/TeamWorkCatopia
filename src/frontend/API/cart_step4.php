<?php
include("../library/member.php");
include("../library/Connection.php");

$order_ID = $_REQUEST['HTTP_HOST'];
echo json_encode($order_ID);
?>