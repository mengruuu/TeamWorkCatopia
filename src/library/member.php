<?php

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

    //取得會員帳號(前台專用)
    function getMemberName(){

        //先判斷session是否存在
        if(!isset($_SESSION)){
            session_start(); 
        }

        //有登入session->回傳Name，無登入session->回傳空字串""
        return isset($_SESSION["MEMBERName"]) ? $_SESSION["MEMBERName"] : ""; 

    }

    //寫入Session(前台專用)
    function setMemberInfo($MEMBERID, $MEMBERName){

        //先判斷session是否存在
        if(!isset($_SESSION)){
            session_start(); 
        }

        //Table 'ec_MEMBER'裡的ID欄位值
        $_SESSION["MEMBERID"] = $MEMBERID; 

        //Table 'ec_MEMBER'裡的Account欄位值
        $_SESSION["MEMBERName"] = $MEMBERName; 
        
    }

?>