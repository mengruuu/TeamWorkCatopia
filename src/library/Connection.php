<?php

       //MySQL相關資訊
       $db_host = "127.0.0.1";
       $db_user = "root";
<<<<<<< HEAD
       $db_pass = "gtr123456";
=======
       $db_pass = "password";
>>>>>>> 5a350ea6a2716f28972efb2fda22e43146f19326
       $db_select = "CATOPIA";

       //建立資料庫連線物件 (dsn=data source name 包含一些連線資訊，不同的資料庫系統其所需的資訊不一)
       $dsn = "mysql:host=".$db_host.";dbname=".$db_select;

       //建立PDO物件，並放入指定的相關資料
       $pdo = new PDO($dsn, $db_user, $db_pass);

       // ---------------------------------------------------
       // ---
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