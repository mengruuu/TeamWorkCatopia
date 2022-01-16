<?php
	include("../library/member.php");
    include("../library/Connection.php");

    $type = json_decode(file_get_contents("php://input"));
    
    $sql_get_picture ="SELECT GAMESTORE_PRODUCT_PICTURE FROM GAMESTORE WHERE GAMESTORE_PRODUCT_TYPE_NAME = ?";
    $statement_picture = $pdo ->prepare($sql_get_picture);
    $statement_picture ->bindValue(1,$type);
    $statement_picture ->execute();
    $data_picture = $statement_picture ->fetchAll();

    echo json_encode($data_picture);

?>
