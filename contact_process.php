<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate fields
    if (!$name || !$email || !$message) {
        $error = 'Please fill in all fields.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Invalid email format.';
    } else {
        // Set your email address here
        $to = 'your@email.com'; // <-- CHANGE THIS TO YOUR EMAIL
        $subject = 'New Contact Form Submission - PC Games';
        $body = "Name: $name\nEmail: $email\nMessage:\n$message";
        $headers = "From: $email\r\nReply-To: $email";

        if (mail($to, $subject, $body, $headers)) {
            $success = 'Thank you for contacting us! We will get back to you soon.';
        } else {
            $error = 'Sorry, there was an error sending your message. Please try again later.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - PC Games</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main class="main-content">
        <h2>Contact Us</h2>
        <?php if (!empty($error)): ?>
            <div style="color:red;"> <?php echo $error; ?> </div>
        <?php endif; ?>
        <?php if (!empty($success)): ?>
            <div style="color:green;"> <?php echo $success; ?> </div>
        <?php endif; ?>
        <form action="contact_process.php" method="post" aria-label="Contact form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required aria-required="true" autocomplete="name" value="<?php echo isset($name) ? htmlspecialchars($name) : ''; ?>">

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required aria-required="true" autocomplete="email" value="<?php echo isset($email) ? htmlspecialchars($email) : ''; ?>">

            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="4" required aria-required="true"><?php echo isset($message) ? htmlspecialchars($message) : ''; ?></textarea>

            <button type="submit">Send Message</button>
        </form>
        <p><a href="contact.html">Back to Contact Page</a></p>
    </main>
</body>
</html>
