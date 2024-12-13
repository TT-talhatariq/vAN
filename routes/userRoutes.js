// routes/user.js
const express = require('express')
const User = require('../models/userModal')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/email')
const { resetPasswordEmail, welcomeEmail } = require('../utils/emailHtml')
const crypto = require('crypto')

router.get('/all', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

router.get('/:id', async (req, res) => {
  const params = req.params

  const user = await User.findById(params.id)
  res.send(user)
})

router.post('/signup', async (req, res) => {
  try {
    let data = req.body

    // get picture

    // upload to cloud (aws s3 bucket) (google cloud buckets)

    // they will return a url.

    // that url we can in DB.

    const hash = await bcrypt.hash(data.password, 12) // encryption

    let userToBeCreated = {
      username: data.username,
      email: data.email,
      password: hash,
      confirmPassword: hash,
      gender: data.gender,
      age: data.age,
    }

    const user = await User.create(userToBeCreated)

    const welcomeEmailHTML = welcomeEmail()

    let options = {
      subject: 'Welcome To Eventify',
      email: user.email,
      text: 'Welcome!',
      html: welcomeEmailHTML,
    }

    // 2. Send a email to our account
    await sendEmail(options)

    res.send(user)
  } catch (err) {
    res.send(err)
  }
})

router.post('/login', async (req, res) => {
  let data = req.body

  const user = await User.findOne({ email: data.email })

  if (user === null) return res.send('No User Exist with this Email')

  const isEqual = await bcrypt.compare(data.password, user.password)

  if (!isEqual) return res.send('Credentials Invalid')

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: process.env.expireTime,
  })

  const { password, confirmPassword, ...userWithoutPassword } = user._doc

  res.send({
    message: 'Login Done Successfully!!',
    user: userWithoutPassword,
    token,
  })
})

router.delete('/delete/:id', async (req, res) => {
  const params = req.params

  const user = await User.findByIdAndDelete(params.id)
  res.send(user)
})

router.post('/forgetPassword', async (req, res) => {
  // 1. Needs a email
  let email = req.body.email

  if (!email) {
    return res.status(401).json({ message: 'Kindly Provide Your Email!' })
  }

  const user = await User.findOne({ email: email })

  if (!user) {
    return res
      .status(401)
      .json({ message: 'There is no user associated with the email!' })
  }

  const resetToken = user.createPasswordResetToken()
  await user.save({ validateBeforeSave: false })

  const resetLink = `https://dev-carzoomo.vercel.app/reset-password/${resetToken}`

  const resetEmailHTML = resetPasswordEmail(resetLink)

  let options = {
    subject: 'Your Reset Link',
    email: email,
    text: 'We received a request to reset your password for your Eventify account. Click the button below to reset it',
    html: resetEmailHTML,
  }

  // 2. Send a email to our account
  await sendEmail(options)
  res.status(200).json({ message: 'Reset Link Sent to Your Email' })
})

router.put('/changePassword/:token', async (req, res) => {
  const token = req.params.token
  const { newPassword, confirmNewPassword } = req.body

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  })

  if (!user) {
    return res.status(400).json({ message: 'Token is invalid or expired' })
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: 'Password are not matching!' })
  }

  // find
  user.password = newPassword
  user.passwordResetToken = undefined
  user.passwordResetTokenExpires = undefined
  await user.save()

  res.status(200).json({ message: 'Password reset successfully!!' })
})

// Login with Google

// getProfile

module.exports = router
