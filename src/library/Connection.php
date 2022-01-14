<?php

       //MySQL相關資訊
<<<<<<< HEAD
       // $db_host = "127.0.0.1";
       // $db_user = "root";
       // $db_pass = "password";
       // $db_select = "CATOPIA";

       $db_host = "127.0.0.1";
       $db_user = "tibamefe_since2021";
       $db_pass = "vwRBSb.j&K#E";
       $db_select = "tibamefe_tfd104g4";
=======
       $db_host = "127.0.0.1";
       $db_user = "root";
       $db_pass = "password";
       $db_select = "CATOPIA";

       // $db_host = "127.0.0.1";
       // $db_user = "tibamefe_since2021";
       // $db_pass = "vwRBSb.j&K#E";
       // $db_select = "tibamefe_tfd104g4";
>>>>>>> a82d834d35aa93516de8c9c2330138a26bf5bc6a

       //建立資料庫連線物件 (dsn=data source name 包含一些連線資訊，不同的資料庫系統其所需的資訊不一)
       $dsn = "mysql:host=".$db_host.";dbname=".$db_select;

       //建立PDO物件，並放入指定的相關資料
       $pdo = new PDO($dsn, $db_user, $db_pass);

       // ---------------------------------------------------
       // --------------
       // function getConn(){
       //        //MySQL相關資訊
       //        $db_host = "127.0.0.1";
       //        $db_user = "root";
       //        $db_pass = "password";
       //        $db_select = "pdo";

       //        //建立資料庫連線物件 (dsn=data source name 包含一些連線資訊，不同的資料庫系統其所需的資訊不一)
       //        $dsn = "mysql:host=".$db_host.";dbname=".$db_select;

       //        //建立PDO物件，並放入指定的相關資料
       //        $pdo = new PDO($dsn, $db_user, $db_pass);
       //               //$pdo沒有回傳 讀不到
       //        return $pdo;

       // }

?>