<?php
header('Content-Type: application/json');

// DB config
$host = 'localhost';
$db   = 'pcgamesdb'; // apne DB ka naam
$user = 'root';    // apne DB user
$pass = '';        // apne DB password

// 1. Validate
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if(!$name || !$email || !$subject || !$message){
    echo json_encode(['success'=>false, 'error'=>'All fields are required.']);
    exit;
}

// 2. Store in DB
$conn = new mysqli($host, $user, $pass, $db);
if($conn->connect_error){
    echo json_encode(['success'=>false, 'error'=>'Database connection failed: ' . $conn->connect_error]);
    exit;
}
$stmt = $conn->prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(['success'=>false, 'error'=>'Prepare failed: ' . $conn->error]);
    exit;
}
$stmt->bind_param("ssss", $name, $email, $subject, $message);
if (!$stmt->execute()) {
    echo json_encode(['success'=>false, 'error'=>'Execute failed: ' . $stmt->error]);
    exit;
}
$stmt->close();
$conn->close();

// 3. Send Email
$to = "info@pcgames.com.de"; // apna email
$headers = "From: $email\r\nReply-To: $email\r\n";
$body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message";
@mail($to, "New Contact Form Submission: $subject", $body, $headers);

// 4. Success response
echo json_encode(['success'=>true]);
?>
