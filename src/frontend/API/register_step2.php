<?php
    session_start();
    echo json_encode($_SESSION['temp_member_info']);
?>