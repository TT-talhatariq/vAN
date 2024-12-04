// routes/user.js
const express = require('express')
const User = require('../models/userModal')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/email')
const { resetPasswordEmail, welcomeEmail } = require('../utils/emailHtml')

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

  const resetEmailHTML = resetPasswordEmail()

  let options = {
    subject: 'Your Reset Link',
    email: email,
    text: 'We received a request to reset your password for your Eventify account. Click the button below to reset it',
    html: resetEmailHTML,
  }

  // 2. Send a email to our account
  await sendEmail(options)
  res.json('Forget Password')
})

router.put('/changePassword', (req, res) => {
  res.send('Change Done')
})

module.exports = router
