<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "../Dasboard/Miller/PHPMailer.php";
require "../Dasboard/Miller/Exception.php";
require "../Dasboard/Miller/SMTP.php";

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['userEmail'])) {
    $Correo = $_POST['userEmail'];

    if (!filter_var($Correo, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Correo inválido.');</script>";
        exit;
    }

    // Generar y almacenar el código en la sesión
    $Codigo = random_int(1000, 9999);
    $_SESSION['verificationCode'] = $Codigo;
    $_SESSION['userEmail'] = $Correo;

    // Configuración del correo
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'eduardo1912meza@gmail.com'; // Cambia esta a tu correo de Gmail
        $mail->Password = 'edfz pofw svix mtbf'; // Manejar de forma segura
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('eduardo1912meza@gmail.com', 'ConfeccionesKYM');
        $mail->addAddress($Correo);

        $mail->isHTML(true);
        $mail->Subject = 'Código de Verificación';
        $mail->Body = "Tu código de verificación es: <strong>" . $Codigo . "</strong>";

        if ($mail->send()) {
            echo $Codigo; // Devolver el código generado al cliente
        } else {
            echo "Error al enviar el correo.";
        }
    } catch (Exception $e) {
        echo "Error al enviar el correo: {$mail->ErrorInfo}";
    }
}
?>
