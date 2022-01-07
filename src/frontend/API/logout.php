<?php

session_start();
session_unset();
session_destroy();

// echo json_encode('登出成功');
echo ('登出成功');

?>