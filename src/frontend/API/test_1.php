<?php
    $contact = json_decode(file_get_contents("php://input"), true);

    $pdo = new PDO(
        "mysql:host=127.0.0.1;dbname=tibamefe_tfd104g4",
        "tibamefe_since2021",
        "vwRBSb.j&K#E"
    );

    $sql = "insert into CONTACT(NAME, EMAIL, MARK) values(:name, :email, :mark)";
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":name", $contact["name"]);
    $statement->bindValue(":email", $contact["email"]);
    $statement->bindValue(":mark", $contact["mark"]);
    $statement->execute();
//新增
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//設定檔案路徑
require './Exception.php';
require './PHPMailer.php';
require './SMTP.php';

// 收件人
$recipient = 'tfd10404@gmail.com';
// 寄件標題
$mailTitle = 'new message received';
// html內容
$mailBody = "信件內容";
// 不支援html時的內容
$mailAltBody = "不支援html";

//建立物件                                                                
$mail = new PHPMailer(true);

try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;  // Enable verbose debug output
    $mail->SMTPDebug = 0; // DEBUG訊息
    $mail->isSMTP(); // 使用SMTP
    $mail->Host = 'smtp.gmail.com'; // SMTP server 位址
    $mail->SMTPAuth = true;  // 開啟SMTP驗證

    $mail->Username = 'tfd10404@gmail.com'; // SMTP 你的gmail帳號
    $mail->Password = 'tibame2022'; // SMTP 你的gmail密碼

    //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->SMTPSecure = "ssl"; // Gmail要透過SSL連線
    $mail->Port       = 465; // SMTP TCP port 

    //設定收件人資料
    $mail->setFrom('tfd10404@gmail.com', ''); // 寄件人(透過Gmail發送會顯示Gmail帳號為寄件者)
    $mail->addAddress($recipient); // 收件人

    // 信件內容
    $mail->isHTML(true); // 設定為HTML格式
    $mail->Subject =  $mailTitle;
    // 'Here is the subject'; // 信件標題
    $mail->Body    = $mailBody;
    //  'This is the HTML message body <B>in bold!</B>'; // 信件內容
    $mail->AltBody = $mailAltBody;
    //  'This is the body in plain text for non-HTML mail clients'; // 對方若不支援HTML的信件內容

    $mail->send();
    // echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

    echo "success";
?>