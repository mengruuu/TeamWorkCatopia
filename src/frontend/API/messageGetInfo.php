<?PHP
    include("../library/Connection.php");
    // $member_id = json_decode(file_get_contents('php://input'));
    $get_message_info = "SELECT * FROM MESSAGE";
    $statement_info = $pdo -> prepare($get_message_info);
    // $statement_info ->bindValue(1, $MEMBER_ID);
    $statement_info -> execute();
    $data_member_info = $statement_info -> fetchAll();
    if($data_member_info >0){
        echo json_encode($data_member_info);
    }
?>