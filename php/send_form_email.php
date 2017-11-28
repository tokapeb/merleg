<?php
/*
 * first_name
 * subject
 * email
 * phone
 * address
 * comments
 */

$first_name = $_POST['first_name'];
$subject = $_POST['subject'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$address = $_POST['address'];
$comments = $_POST['comments'];

$body = 'Weboldalon keresztüli üzenet: <br>';
$body .= '<strong>Feladó:</strong> '. $first_name . '<br>';
$body .= '<strong>E-mail:</strong> '. $email . '<br>';
$body .= '<strong>Telefon:</strong> '. $phone . '<br>';
$body .= '<strong>Postai cím:</strong> '. $address . '<br>';
$body .= '<br>';
$body .= '<strong>Üzenet:</strong><br>';
$body .= '<br>' . $comments;

require 'PHPMailerAutoload.php';

$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
$mail->IsSMTP();                                          // SMTP-n keresztuli kuldes
$mail->Host = 'ssl://mail.nethely.hu:465';
$mail->SMTPAuth = true;                                   // SMTP

$mail->Username = 'merleg@merlegszeged.hu';                    // SMTP felhasználo
$mail->Password = 'Merlegszeged321';                         // SMTP jelszo

$mail->From     = 'merleg@merlegszeged.hu';            // Felado e-mail cime
$mail->FromName = 'Mérlegszeged weboldal';                // Felado neve
$mail->AddAddress('merleg@merlegszeged.hu', 'Mérleg készítő');         // Cimzett es neve
$mail->AddReplyTo($email, $first_name); // Valaszlevel ide

$mail->WordWrap = 80;                                     // Sortores allitasa
$mail->IsHTML(true);                                      // Kuldes HTML-kent

$mail->Subject = $subject;                   // A level targya
$mail->Body    = $body;          // A level tartalma

if (!$mail->Send()) {
  echo 'Az üzenetet nem került elküldésre';
  echo 'A felmerült hiba: ' . $mail->ErrorInfo;
  echo 'Kérjük próbálja meg később újra.';
  exit;
}

echo 'Az üzenetet sikeresen elküldtük';
?>