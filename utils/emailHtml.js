exports.resetPasswordEmail = (resetLink) => {
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        /* Inline styles will be applied for email compatibility */
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td>
                <table align="center" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #dddddd; background-color: #ffffff; padding: 20px; border-radius: 10px;">
                    <tr>
                        <td align="center" style="padding: 10px 0;">
                            <h1 style="color: #4caf50; font-size: 24px;">Eventify</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; font-size: 16px; line-height: 1.5; color: #555555;">
                            <p>Hello,</p>
                            <p>We received a request to reset your password for your Eventify account. Click the button below to reset it:</p>
                            <div style="text-align: center; margin: 20px 0;">
                                <a href=${resetLink} style="background-color: #4caf50; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Reset Password</a>
                            </div>
                            <p>If you didn’t request a password reset, you can safely ignore this email. Your password won’t be changed.</p>
                            <p>Thank you,<br>The Eventify Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 20px; font-size: 12px; color: #999999;">
                            <p>© 2024 Eventify. All rights reserved.</p>
                            <p>This email was sent to you because you are a registered user of Eventify.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

    `
}

exports.welcomeEmail = () => {
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Eventify</title>
    <style>
        /* Inline styles for better email compatibility */
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
    <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
            <td>
                <table align="center" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #dddddd; background-color: #ffffff; padding: 20px; border-radius: 10px;">
                    <tr>
                        <td align="center" style="padding: 10px 0;">
                            <h1 style="color: #4caf50; font-size: 24px;">Eventify</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; font-size: 16px; line-height: 1.5; color: #555555;">
                            <p>Hello {{userName}},</p>
                            <p>Welcome to <strong>Eventify</strong>! We’re thrilled to have you on board.</p>
                            <p>With Eventify, you can easily manage and create unforgettable events, explore exciting features, and stay organized. Here's a quick look at what you can do:</p>
                            <ul style="margin: 20px 0; padding: 0; list-style-type: disc; padding-left: 20px; color: #333333;">
                                <li>Organize events with ease.</li>
                                <li>Discover new features and tools for your events.</li>
                                <li>Collaborate with your team effectively.</li>
                            </ul>
                            <p>To get started, log in to your account and explore what Eventify has to offer!</p>
                            <div style="text-align: center; margin: 20px 0;">
                                <a href="{{loginLink}}" style="background-color: #4caf50; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Log In to Eventify</a>
                            </div>
                            <p>If you have any questions, feel free to reach out to our support team. We're here to help!</p>
                            <p>Best regards,<br>The Eventify Team</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 20px; font-size: 12px; color: #999999;">
                            <p>© 2024 Eventify. All rights reserved.</p>
                            <p>This email was sent to you because you signed up for an Eventify account.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

    `
}
