<?php
	// include("./Connection.php");

    //清除Session
    function clearSession(){

        //先判斷session是否存在
        if(!isset($_SESSION)){
            session_start(); 
        }

        session_unset();
        session_destroy();

    }

    //--------------------------------------後台專用--------------------------------------

    //取得Session(後台專用)
    function getSessionB(){

        //先判斷session是否存在
        if(!isset($_SESSION)){
            session_start(); 
        }

        //有登入session->回傳ID，無登入session->回傳空字串""
        return isset($_SESSION["BackendUserID"]) ? $_SESSION["BackendUserID"] : "";             

    }

    //寫入Session(後台專用)
    function setSessionB($UserID){

        //先判斷session是否存在
        if(!isset($_SESSION)){
            session_start(); 
        }

        $_SESSION["BackendUserID"] = $UserID;

    }

    //--------------------------------------前台專用--------------------------------------

    //取得會員ID(前台專用)
    function getMemberID(){

        //先判斷session是否存在
        if(!isset($_SESSION)){
            session_start(); 
        }

        //有登入session->回傳ID，無登入session->回傳空字串""
        return isset($_SESSION["MEMBER_ID"]) ? $_SESSION["MEMBER_ID"] : ""; 
    }

   

    //寫入Session(前台專用)
    function getMemberInfo(){

        //先判斷session是否存在
        if(!isset($_SESSION)){
            session_start(); 
        }

        
        
    }


    //取得訂單 orderID(前台專用)
    // function getOrderID(){

    //     //抓取資料
    //     session_start(); 
    //     $MEMBER_ID = ($_SESSION["MEMBER_ID"]); 
    //     $check;
       
    //     $sql = "SELECT ORDER_ID FROM ORDER WHERE MEMBER_ID = ?";

    //     //執行並查詢，會回傳查詢結果的物件，必須使用fetch、fetchAll...等方式取得資料
    //     $statement = $pdo ->prepare($sql);

    //     $statement->bindValue(1, $MEMBER_ID);   

    //     $statement->execute();
    //     //抓出全部且依照順序封裝成一個二維陣列
    //     $data = $statement->fetchAll();

    //     return $data; 

    // }

?>