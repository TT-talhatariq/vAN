const nodeMailer = require('nodemailer')

const emailOptions = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'tt851438207@gmail.com',
    pass: 'cnueeartapqjubxw',
  },
}

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport(emailOptions)

  // 2. set mail options
  const mailOptions = {
    from: 'Eventify',
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.html,
  }

  // 3. send the email
  await transporter.sendMail(mailOptions)
}

module.exports = sendEmail