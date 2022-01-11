<?php
    $db_host = "127.0.0.1";
    $db_user = "root";
    $db_pass = "gtr123456";
    $db_select = "CATOPIA";
    $dsn = "mysql:host=".$db_host.";dbname=".$db_select;
    $pdo = new PDO($dsn, $db_user, $db_pass);

    // 寫入MESSAGE裡
    $sql = "UPDATE MESSAGE SET POST_LIKE = ? WHERE POST_ID = ?";
    $data = [];
    // $name = isset($_POST["Name"])?$_POST["Name"]:$_POST["Name"];
    $likeCountsAndPostId = json_decode(file_get_contents('php://input'));//獲取非表單資料
    
    $statment = $pdo->prepare($sql);
    // $statment->bindValue(1, "%".json_decode($name)."%");
    $statment->bindValue(1, $likeCountsAndPostId -> updateLikeCounts);
    $statment->bindValue(2, $likeCountsAndPostId -> postID);
    $statment->execute();

    // 寫入POST_RESPONSE&LIKE裡面
    $sql = "SELECT * FROM `POST_RESPONSE&LIKE` WHERE POST_ID = ? AND `RESPONSE&LIKE_MEMBER_ID` = ?";
    $statment = $pdo->prepare($sql);
    $statment->bindValue(1, $likeCountsAndPostId -> postID);
    $statment->bindValue(2, $likeCountsAndPostId -> memberId);
    $statment->execute();
    $data = $statment->fetchAll();
    if($data) {
        foreach($data as $key => $variableName){
            if($variableName["LIKE_MODE"]) {
                $sql = "UPDATE `POST_RESPONSE&LIKE` SET LIKE_MODE = ? WHERE POST_ID = ?";
                $statment = $pdo->prepare($sql);
                $statment->bindValue(1, 0);
                $statment->bindValue(2, $likeCountsAndPostId -> postID);
                $statment->execute();
            }else {
                $sql = "UPDATE `POST_RESPONSE&LIKE` SET LIKE_MODE = ? WHERE POST_ID = ?";
                $statment = $pdo->prepare($sql);
                $statment->bindValue(1, 1);
                $statment->bindValue(2, $likeCountsAndPostId -> postID);
                $statment->execute();
            }
        }
    }else {
        $sql = "INSERT INTO `POST_RESPONSE&LIKE`(POST_ID, `RESPONSE&LIKE_MEMBER_ID`, POST_RESPONSE_CONTENT, LIKE_MODE)
                VALUES(?, ?, null, 1)";
        $statment = $pdo->prepare($sql);
        $statment->bindValue(1, $likeCountsAndPostId -> postID);
        $statment->bindValue(2, $likeCountsAndPostId -> memberId);
        $statment->execute();
    }
    
    // 獲取更新後的message資料----------------------------------------------------------
    $sql = "SELECT * FROM MESSAGE";
    $statment = $pdo->prepare($sql);
    $statment->execute();
    $data = $statment->fetchAll();

    echo json_encode($data);
?>